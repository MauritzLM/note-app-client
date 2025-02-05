<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import NavComponent from './components/NavComponent.vue';
import AuthView from './views/AuthView.vue';
import { auth_status } from './context';
// auth status


// if authenticated fetch user notes
</script>

<template>
  <NavComponent v-if="auth_status.authenticated"/>
  <RouterView v-if="auth_status.authenticated"/>

  <AuthView v-else/>
</template>

<style scoped>

</style>
