<template>
  <div>
    <div v-if="!loaded" class="screen-cover">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <span>loading...</span>
    </div>
    <div v-if="loadingError" class="screen-cover">
      <div class="alert alert-danger" role="alert">
        No succes with data loading. Retry in {{ seconds }}s.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { resource: { type: String, default: '' } },
  data() {
    return {
      loaded: false,
      loadingError: '',
      seconds: 5,
      countdown: null,
    }
  },
  watch: {
    seconds(val) {
      if (val === 0) {
        clearInterval(this.countdown)
        this.loadingError = false
        this.seconds = 5
        this.getResource()
      }
    },
  },
  created() {
    this.getResource()
  },
  methods: {
    getResource() {
      this.$axios
        .get(this.resource)
        .then(({ data }) => {
          this.$emit('dataLoaded', data)
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
.screen-cover {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  z-index: 40;
}
</style>
