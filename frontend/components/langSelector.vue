<template>
  <select v-model="selectedLang">
    <option v-for="(lang, index) in langAbbrs" :key="index" :value="lang">
      {{ lang }}
    </option>
  </select>
</template>

<script>
export default {
  computed: {
    langAbbrs() {
      return this.$store.getters.langAbbrs
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
}
</script>
