<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watch, computed } from 'vue';
import NavComponent from './components/NavComponent.vue';
import AuthView from './views/AuthView.vue';
import { auth_status, user } from './context';


const color_theme = computed(() => {
  return user.theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : user.theme
})

// determine auth status
// get token from local storage
// check if token is valid*
watch(user, () => {
  if (!auth_status.authenticated && localStorage.user) {
    user.updateUser(JSON.parse(localStorage.user))
    auth_status.login()
  }

  // fetch all notes if not in context*

}, { immediate: true, once: true })

// determine theme and font*
// const sys_theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

</script>

<template>
  <div class="container" :data-theme="color_theme" :data-font="user.font">
    <NavComponent v-if="auth_status.authenticated" />
    <RouterView v-if="auth_status.authenticated" />

    <AuthView v-else />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 54px auto;
}

@media screen and (min-width: 1000px) {
.container {
  grid-template-columns: 250px 1fr;
}
}
</style>
