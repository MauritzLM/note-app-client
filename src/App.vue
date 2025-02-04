<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import NavComponent from './components/NavComponent.vue';
import AuthView from './views/AuthView.vue';

// auth status
const authenticated = ref(true)

// if authenticated fetch user notes
</script>

<template>
  <NavComponent v-if="authenticated"/>
  <RouterView v-if="authenticated"/>

  <AuthView v-else/>
</template>

<style scoped>

</style>
