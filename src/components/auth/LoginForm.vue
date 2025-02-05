<script setup lang="ts">
import { ref } from 'vue';
import { auth_status, user } from '@/context';

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
      
      // change auth status, set token (add local storage)*
      if (response.status === 200) {
        user.setToken(data.access_token)
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
  </form>
</template>