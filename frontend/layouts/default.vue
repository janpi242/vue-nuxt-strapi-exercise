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
    <!-- TODO: header(top row) should be component to simplify this file-->
    <div
      class="
        viewport
        container-fluid
        h-100
        d-flex
        flex-column
        position-relative
      "
      :class="menuOpened ? 'no-scroll' : ''"
    >
      <div class="row d-sm-none mobile-navigation-bar">
        <div class="col-12 py-2 d-flex justify-content-between">
          <lang-selector />
          <img
            src="more-1.svg"
            width="24"
            height="24"
            @click="menuOpened = true"
          />
        </div>
      </div>
      <div class="row navigation-bar" :class="menuOpened ? 'opened' : ''">
        <div class="col-12 col-sm-3 align-self-center">
          <h2 class="mb-0">Intranet</h2>
        </div>
        <div class="col-12 col-sm-6 justify-content-start align-self-center">
          <ul class="navigation mb-0 p-0">
            <li
              v-for="item in navItems"
              :key="item.id"
              @click="menuOpened = false"
            >
              <NuxtLink :to="item.url">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="col-12 col-sm-3 text-right align-self-center">
          <search-box />
        </div>
        <div class="d-sm-none position-absolute close-button">
          <img
            src="multiply.svg"
            width="24"
            height="24"
            @click="menuOpened = false"
          />
        </div>
      </div>
      <div class="row main-container flex-grow-1">
        <div class="col-12">
          <Nuxt />
        </div>
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script>
import searchBox from './../components/searchBox.vue'
import appFooter from './../components/appFooter.vue'
import LangSelector from '~/components/langSelector.vue'
export default {
  components: { searchBox, appFooter, LangSelector },
  data() {
    return {
      loaded: false,
      loadingError: '',
      seconds: 5,
      countdown: null,
      menuOpened: false,
    }
  },
  computed: {
    navItems() {
      return this.$store.state.currLang.navigation_links
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
  },
  created() {
    this.getLangData()
  },
  methods: {
    getLangData() {
      this.$axios
        .get('/langs')
        .then(({ data }) => {
          this.$store.commit('storeLangs', data)
          const langAbbrs = data.map((lang) => lang.lang_abbr)
          this.$store.commit('selectLang', langAbbrs[0])
          this.loaded = true
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

body {
  overflow-x: hidden;
}

a:hover {
  text-decoration: none;
  border-bottom: 2px solid lightblue;
}

.nuxt-link-exact-active {
  border-bottom: 2px solid blue;
}

.no-scroll {
  overflow-y: hidden;
  position: fixed;
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
  z-index: 40;
}

.viewport {
  overflow-x: hidden;
}
.mobile-navigation-bar {
  background-color: white;
  // many cons to use sticky, js would be better
  position: sticky;
  top: 0;
  z-index: 15;
  select {
    position: relative;
    top: 1px;
  }
}

.navigation-bar {
  position: fixed;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: white;
  right: -100%;
  transition: right 0.25s linear;
  .col-12 {
    flex: initial;
  }
  h2 {
    text-align: center;
  }
  &.opened {
    right: calc(0% + 15px);
  }
}

.close-button {
  top: 0.375rem;
  right: 0.375rem;
}

.main-container {
  background-color: lightgray;
}

.navigation {
  list-style: none;
  li {
    text-align: center;
    padding: 8px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }
}

@media screen and (min-width: 576px) {
  .navigation-bar {
    position: relative;
    width: auto;
    height: auto;
    flex-direction: row;
    right: 0% !important;
    .col-12 {
      flex: 0 0 100%;
    }
    h2 {
      text-align: left;
    }
    .navigation {
      li {
        display: inline-block;
        padding: initial;
        border-bottom: none;
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
