<template>
  <div class="pb-5">
    <div class="pb-2">
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-position mb-1">
        <a class="navbar-brand" href="/">StonksTester</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <template>
              <li :class="{'nav-item':this.currentPage !== 'testScenarios', 'nav-item active':this.currentPage === 'testScenarios' }">
                <router-link class="nav-link" to="/test/scenarios" data-toggle="collapse" data-target=".navbar-collapse.show">Test Scenarios</router-link>
              </li>
            </template>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import router from '../router';
import store from '../stores/store';
import {mapActions} from "vuex";

export default {
  ...mapActions(["clearToken"]),
  name: 'navbar',
  data() {
    return {
      currentPage: router.currentRoute.name
    }
  },
  methods: {
    logout() {
      store.dispatch('clearToken');
      localStorage.removeItem('token');
      router.replace('/')
    }
  },
  watch: {
    $route() {
      this.currentPage = router.currentRoute.name;
    }
  }
}
</script>

<style>
.navbar-position {
  position: fixed !important;
  width: 100%;
  z-index: 100;
}
</style>