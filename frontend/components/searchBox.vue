<template>
  <div class="position-relative">
    <input
      type="text"
      class="form-control input-sm search-input"
      :placeholder="searchWord"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('submit', $event.target.value)"
    />
    <i
      class="trigger position-absolute"
      @click="$emit('submit', $event.target.value)"
    ></i>
  </div>
</template>

<script>
export default {
  props: { value: { type: String, default: '' } },
  computed: {
    searchWord() {
      return this.$store.state.dictionary.search
    },
  },
}
</script>

<style lang="scss">
.search-input {
  position: relative;
  padding-right: 1.7rem;
  border-color: darkgray;
  background-color: white;
  // may not work in IE
  background-image: url(/searchIco.svg);
  background-position: right 0.375rem center;
  background-repeat: no-repeat;
}
.trigger {
  display: block;
  width: 2.1rem;
  height: 100%;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
