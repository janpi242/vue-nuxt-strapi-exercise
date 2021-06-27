<template>
  <div class="h-100">
    <!-- TODO: loading screens should be component to simplify this file-->
    <div v-if="!loaded" class="screen-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <span>loading...</span>
    </div>
    <div v-if="loadingError" class="screen-center">
      <div class="alert alert-danger" role="alert">
        No succes with data loading. Retry in {{ seconds }}s.
      </div>
    </div>
    <div class="container-fluid h-100 d-flex flex-column">
      <!-- TODO: header(top row) should be component to simplify this file-->
      <div class="row">
        <div class="col-3 align-self-center">
          <h2 class="mb-0">Intranet</h2>
        </div>
        <div class="col-6 justify-content-start align-self-center">
          <ul class="navigation mb-0 p-0">
            <li v-for="item in navItems" :key="item.id">
              <NuxtLink :to="item.url">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="col-3 text-right align-self-center">
          <search-box />
        </div>
      </div>
      <div class="row main-container flex-grow-1">
        <div class="col-12">
          <Nuxt />
        </div>
      </div>
      <div class="footer">
        <!-- TODO: footer should be component to simplify this file-->
        <div class="row">
          <div class="col-10">{{ footerText }}</div>
          <div class="col-2 text-right">
            <select v-model="selectedLang">
              <option
                v-for="(lang, index) in langAbbrs"
                :key="index"
                :value="lang"
              >
                {{ lang }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBox from './../components/searchBox.vue'
export default {
  components: { searchBox },
  data() {
    return {
      langData: [],
      loaded: false,
      loadingError: '',
      langAbbrs: [],
      seconds: 5,
      countdown: null,
    }
  },
  computed: {
    navItems() {
      return this.loaded && this.selectedLang
        ? this.getLangByAbbr(this.selectedLang).navigation_links
        : {}
    },
    footerText() {
      return this.$store.state.dictionary.footer
    },
    selectedLang: {
      get() {
        return this.$store.state.selectedLang
      },
      set(newLangAbbr) {
        this.$store.commit('selectLang', newLangAbbr)
      },
    },
  },
  watch: {
    seconds(val) {
      if (val === 0) {
        clearInterval(this.countdown)
        this.loadingError = false
        this.seconds = 5
        this.getLangData()
      }
    },
    selectedLang(val) {
      const dictionary = this.getLangByAbbr(val).dictionary
      this.$store.commit('setDictionary', dictionary)
      const categoryIds = this.getLangByAbbr(val).categories.map(
        (cat) => cat.id
      )
      this.$store.commit('storeCategoryIds', categoryIds)
    },
  },
  created() {
    this.getLangData()
  },
  methods: {
    getLangByAbbr(abbr) {
      return this.langData.find((lang) => lang.lang_abbr === abbr)
    },
    getLangData() {
      this.$axios
        .get('/langs')
        .then(({ data }) => {
          this.langData = data
          this.langAbbrs = data.map((lang) => lang.lang_abbr)
          this.loaded = true
          this.$store.commit('setDictionary', data[0].dictionary)
          this.$store.commit('selectLang', this.langAbbrs[0])
          const categoryIds = data[0].categories.map((cat) => cat.id)
          this.$store.commit('storeCategoryIds', categoryIds)
        })
        .catch(() => {
          this.loadingError = true
          this.countdown = setInterval(() => {
            this.seconds--
          }, 1000)
        })
    },
  },
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html,
body,
div#__nuxt,
#__layout,
#app {
  height: 100%;
}

a:hover {
  text-decoration: none;
  border-bottom: 2px solid lightblue;
}

.nuxt-link-exact-active {
  border-bottom: 2px solid blue;
}

.screen-center {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.navigation {
  list-style: none;
  li {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}

.main-container {
  background-color: lightgray;
}
</style>
