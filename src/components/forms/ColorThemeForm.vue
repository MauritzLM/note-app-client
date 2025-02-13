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
    <h2>Color Theme</h2>
    <p>Choose your color theme:</p>

    <div class="input-group">
      <div class="form-group">
        <label for="light" :class="picked === 'light' ? 'cs-active' : ''">
          <div>
            <span>Light mode</span>
            <span>Pick a clean and classic light theme</span>
          </div>
          <input type="radio" id="light" name="color-theme" value="light" v-model="picked">
        </label>
      </div>

      <div class="form-group">
        <label for="dark" :class="picked === 'dark' ? 'cs-active' : ''">
          <div>
            <span>Dark mode</span>
            <span>Select a sleek and modern dark theme</span>
          </div>
          <input type="radio" id="dark" name="color-theme" value="dark" v-model="picked">
        </label>
      </div>

      <div class="form-group">
        <label for="system" :class="picked === 'system' ? 'cs-active' : ''">
          <div>
            <span>System</span>
            <span>Adapts to your devices theme</span>
          </div>
          <input type="radio" id="system" name="color-theme" value="system" v-model="picked">
        </label>
      </div>
    </div>

    <button type="submit" class="btn-primary">Apply Changes</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;

  h2 {
    margin: 12px 0;
  }

  .input-group {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1px solid var(--borderColor);
    border-radius: 10px;
    cursor: pointer;

    span {
      display: block;
    }

    input {
      height: 16px;
      width: 16px;
    }
  }

  .cs-active {
    background-color: var(--tagBackground);
  }

  .btn-primary {
    align-self: end;
    margin-top: 24px;
  }

}
</style>