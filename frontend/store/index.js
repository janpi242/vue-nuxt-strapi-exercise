export const state = () => ({
  dictionary: {},
  selectedLang: '',
  categoryIds: [],
  categories: [],
})

export const mutations = {
  setDictionary: (state, dictionary) => (state.dictionary = dictionary),
  selectLang: (state, lang) => (state.selectedLang = lang),
  storeCategoryIds(state, categoryIds) {
    state.categoryIds = categoryIds
  },
  storeCategories(state, categories) {
    state.categories = categories
  },
}

export const getters = {
  categoriesByCurrLang: (state) =>
    state.categories.filter(
      (cat) => state.categoryIds.includes(cat.id) && cat.links.length
    ),
}
