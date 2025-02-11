<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watch } from 'vue';
import NavComponent from './components/NavComponent.vue';
import AuthView from './views/AuthView.vue';
import { auth_status, user } from './context';

// determine auth status
 watch(user, () => {
   if (localStorage.user) {
    user.setUser(JSON.parse(localStorage.user))
    auth_status.login()
   }

 }, { immediate: true, once: true })

 // determine themes*

</script>

<template>
  <NavComponent v-if="auth_status.authenticated" />
  <RouterView v-if="auth_status.authenticated" />

  <AuthView v-else />
</template>

<style scoped></style>
