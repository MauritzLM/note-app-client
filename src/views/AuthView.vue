<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import SignupForm from '@/components/auth/SignupForm.vue';
import { ref } from 'vue';

const current_page = ref('login')

function change_page(p: string) {
  current_page.value = p
}

// add password reset link and password reset form*

</script>

<template>
  <div class="form-container">
    <LoginForm :page-toggle="change_page" v-if="current_page === 'login'" />
    <SignupForm :page-toggle="change_page" v-if="current_page === 'signup'" />
  </div>
</template>

<style scoped>

.form-container {
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bannerColor);
}
</style>