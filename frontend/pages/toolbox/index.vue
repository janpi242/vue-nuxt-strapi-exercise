<template>
  <div class="row">
    <load-or-error resource="/categories" @dataLoaded="handleData" />
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
            <div class="display-flex pl-3 pb-2">
              <img
                width="24"
                height="24"
                :src="category.icon_url"
                class="mr-2"
              />
              <span class="category-name">{{ category.name }}</span>
            </div>
            <ul class="">
              <li v-for="link in category.links" :key="link.id">
                <a :href="link.url">{{ link.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBox from '~/components/searchBox.vue'
import LoadOrError from '~/components/loadOrError.vue'
export default {
  components: { searchBox, LoadOrError },
  data() {
    return {
      searchText: '',
      runFilterAnyway: false,
      highiest: null,
    }
  },
  computed: {
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
    handleData(categories) {
      this.$store.commit('storeCategories', categories)
    },
  },
}
</script>

<style lang="scss">
.category-name {
  line-height: 24px;
  position: relative;
  top: 2px;
}
</style>
