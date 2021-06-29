<template>
  <footer class="footer">
    <div class="row">
      <div class="col-10">{{ footerText }}</div>
      <div class="col-2 text-right d-none d-sm-block">
        <lang-selector />
      </div>
    </div>
  </footer>
</template>

<script>
import langSelector from './langSelector.vue'
export default {
  components: { langSelector },
  computed: {
    footerText() {
      return this.$store.state.dictionary.footer
    },
  },
}
</script>
