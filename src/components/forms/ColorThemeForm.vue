<script setup lang="ts">
import { ref } from 'vue';
import { user, auth_status } from '@/context';

const { current_theme = '' } = defineProps<{ current_theme?: string }>()

const picked = ref(current_theme)

// update color theme function
async function update_theme(event: Event) {
  try {
    event.preventDefault()

    if (picked.value === user.theme) {
      return
    }
    const response = await fetch('http://localhost:8000/users/color', {
      method: 'POST',
      headers: {
        'authorization': `bearer ${user.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ color_theme: picked.value })
    })

    const data = await response.json()

    console.log(data)

    if (response.status === 401) {
      auth_status.logout()
    }

    // if success
    if (response.status === 200) {
      user.updateTheme(picked.value)

      localStorage.setItem('user', JSON.stringify({ username: user.username, font: user.font, theme: picked.value, token: user.token }))
    }


  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <form action="" @submit="update_theme">
    <div class="form-group">
      <label for="light"><span>Light mode</span>
        <input type="radio" id="light" name="color-theme" value="light" v-model="picked">
      </label>

    </div>
    <div class="form-group">
      <label for="dark"><span>Dark mode</span>
        <input type="radio" id="dark" name="color-theme" value="dark" v-model="picked">
      </label>
    </div>
    <div class="form-group">
      <label for="system"><span>System</span>
        <input type="radio" id="system" name="color-theme" value="system" v-model="picked">
      </label>
    </div>

    <button>Apply Changes</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>