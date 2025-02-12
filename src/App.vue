<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watch } from 'vue';
import NavComponent from './components/NavComponent.vue';
import AuthView from './views/AuthView.vue';
import { auth_status, user } from './context';

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
  <div data-theme="" data-font="">
    <NavComponent v-if="auth_status.authenticated" />
    <RouterView v-if="auth_status.authenticated" />

    <AuthView v-else />
  </div>
</template>

<style scoped></style>
