<template>
  <div class="h-100">
    <load-or-error resource="/langs" @dataLoaded="handleData" />
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
      <navigation @onChange="menuOpened = !menuOpened" />
      <div class="row main-container flex-grow-1 pt-4 pt-sm-0">
        <div class="col-12 pt-4">
          <Nuxt />
        </div>
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/navigation.vue'
import AppFooter from '~/components/appFooter.vue'
import LoadOrError from '~/components/loadOrError.vue'
export default {
  components: { AppFooter, Navigation, LoadOrError },
  data() {
    return {
      menuOpened: false,
    }
  },
  methods: {
    handleData(langs) {
      this.$store.commit('storeLangs', langs)
      const langAbbrs = langs.map((lang) => lang.lang_abbr)
      this.$store.commit('selectLang', langAbbrs[0])
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

.no-scroll {
  overflow-y: hidden;
  position: fixed;
}

.viewport {
  overflow-x: hidden;
}

.main-container {
  background-color: lightgray;
}
</style>
