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
  <LoginForm :page-toggle="change_page" v-if="current_page === 'login'" />
  <SignupForm :page-toggle="change_page" v-if="current_page === 'signup'" />
</template>