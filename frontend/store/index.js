export const state = () => ({
  dictionary: {},
  selectedLang: '',
  categoryIds: [],
  categories: [],
  langs: [],
  currLang: {},
})

export const mutations = {
  setDictionary: (state, dictionary) => (state.dictionary = dictionary),
  selectLang: (state, langAbbr) => {
    state.selectedLang = langAbbr
    state.currLang = state.langs.find((lang) => lang.lang_abbr === langAbbr)
    state.dictionary = state.currLang.dictionary
    state.categoryIds = state.currLang.categories.map((cat) => cat.id)
  },
  storeLangs: (state, langs) => (state.langs = langs),
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
  langAbbrs: (state) => state.langs.map((lang) => lang.lang_abbr),
}
