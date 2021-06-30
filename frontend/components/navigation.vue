<template>
  <div>
    <div class="row d-sm-none mobile-navigation-bar position-fixed w-100">
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
  </div>
</template>

<script>
import searchBox from './../components/searchBox.vue'
import LangSelector from '~/components/langSelector.vue'
export default {
  components: { searchBox, LangSelector },
  data() {
    return {
      menuOpened: false,
    }
  },
  computed: {
    navItems() {
      return this.$store.state.currLang.navigation_links
    },
  },
}
</script>

<style lang="scss">
.nuxt-link-exact-active {
  border-bottom: 2px solid blue;
}
.mobile-navigation-bar {
  background-color: white;
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
  top: 0;
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
