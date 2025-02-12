<script setup lang="ts">
import { ref } from 'vue';
import { auth_status, user } from '@/context';

defineProps<{
  pageToggle: (m: string) => void
}>()

const name_input = ref('')
const password_input = ref('')
const error = ref('')

async function login(event: Event) {
  try {
    event.preventDefault()

    const formData = new FormData()

    formData.append('username', name_input.value)
    formData.append('password', password_input.value)

    const response = await fetch('http://localhost:8000/users/login', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    // set error message
    if (response.status === 401) {
      error.value = data.detail
    }

    // change auth status, set user / localstorage
    if (response.status === 200) {
      user.setUser(data)

      localStorage.setItem('user', JSON.stringify({ username: data.details.username, theme: data.details.theme, font: data.details.font, token: data.token.access_token }))

      auth_status.login()
    }


  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <form action="" @submit="login">
    <div class="form-group">
      <label for="username">Username</label>
      <input v-model="name_input" type="text" name="username" id="username">
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password_input" type="password" name="password" id="password">
    </div>
    <span>{{ error }}</span>

    <button type="submit">Login</button>

    <p>Already have an account? <button type="button" @click="pageToggle('signup')">Sign Up</button></p>
  </form>
</template>