<template>
  <div class="row mt-4">
    <div class="col-12 col-sm-3 col-lg-2 mb-4">
      <search-box
        :value="searchText"
        @input="searchText = $event"
        @submit="runFilter"
      />
    </div>
    <div class="col-12 col-sm-9 col-lg-10">
      <div ref="equalHeight" class="row">
        <div
          v-for="category in categories"
          :key="category.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        >
          <div class="p-2 bg-light h-100">
            {{ category.name }}
            <div v-for="link in category.links" :key="link.id">
              <a :href="link.url">{{ link.name }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBox from './../../components/searchBox.vue'
export default {
  components: { searchBox },
  data() {
    return {
      searchText: '',
      runFilterAnyway: false,
      highiest: null,
    }
  },
  computed: {
    selectedLang() {
      return this.$store.state.selectedLang
    },
    categories() {
      if (this.searchText.length <= 3 && !this.runFilterAnyway) {
        return this.$store.getters.categoriesByCurrLang
      } else {
        const filterRes = []
        this.$store.getters.categoriesByCurrLang.forEach((cat) => {
          if (cat.name.toLowerCase().includes(this.searchText.toLowerCase())) {
            filterRes.push(cat)
          } else {
            const filteredLinks = cat.links.filter((link) =>
              link.name.toLowerCase().includes(this.searchText.toLowerCase())
            )
            if (filteredLinks.length) {
              const catCopy = { ...cat }
              catCopy.links = filteredLinks
              filterRes.push(catCopy)
            }
          }
        })
        return filterRes
      }
    },
  },
  watch: {
    searchText() {
      this.runFilterAnyway = false
    },
  },
  updated() {
    if (this.categories.length) {
      this.setChildrenEqualHeight(this.$refs.equalHeight)
    }
  },
  created() {
    // TODO: share loader and error handling from default layout
    if (!this.categories.length) {
      this.$axios
        // TODO: research - looks like strapi doesn't return children -> /langs/1/categories won't work
        .get('/categories')
        .then(({ data }) => {
          // this.loaded = true
          this.$store.commit('storeCategories', data)
        })
        .catch(() => {
          // this.loadingError = true
          // this.countdown = setInterval(() => {
          //   this.seconds--
          // }, 1000)
        })
    }
  },
  mounted() {
    this.setChildrenEqualHeight(this.$refs.equalHeight)
    window.addEventListener('resize', () => {
      if (this.categories.length) {
        this.setChildrenEqualHeight(this.$refs.equalHeight)
      }
    })
  },
  methods: {
    runFilter() {
      this.runFilterAnyway = true
    },
  },
}
</script>
