<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  pageToggle: (m: string) => void
}>()

const name_input = ref('')
const email_input = ref('')
const password_input = ref('')

const error = ref('');


async function sign_up(event: Event) {
  try {
    event.preventDefault()

    const response = await fetch('http://localhost:8000/users/create', {
      method: 'POST',
      headers: {
       'Content-type': 'application/json'
      },
      body: JSON.stringify({ username: name_input.value, password: password_input.value, email: email_input.value })
    })

    const data = await response.json()

    // errors
    if (response.status === 422) {
      console.log(data.detail)
      error.value = data.detail[0].msg
      return
    }

    // success
    console.log(data)

    
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form action="" @submit="sign_up">
    <p>{{ error }}</p>
    <div class="form-group">
      <label for="username">Username</label>
      <input v-model="name_input" type="text" name="username" id="username">
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input v-model="email_input" type="email" name="email" id="email">
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password_input" type="password" name="password" id="password">
    </div>

    <button type="submit">Sign up</button>

    <p>Already have an account? <button type="button" @click="pageToggle('login')">login</button></p>

  </form>

</template>