<script setup lang="ts">
import { ref } from 'vue';
import { user, auth_status } from '@/context';

const { current_font = '' } = defineProps<{ current_font?: string }>()

const picked = ref(current_font)

// update font theme function
async function update_font(event: Event) {
  try {
    event.preventDefault()

    if (picked.value === user.font) {
      return
    }
    const response = await fetch('http://localhost:8000/users/font', {
      method: 'POST',
      headers: {
        'authorization': `bearer ${user.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ font_theme: picked.value })
    })

    const data = await response.json()

    console.log(data)

    if (response.status === 401) {
      auth_status.logout()
    }

    // if success
    if (response.status === 200) {
      user.updateFont(picked.value)

      localStorage.setItem('user', JSON.stringify({ username: user.username, font: picked.value, theme: user.theme, token: user.token }))
    }

  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <form action="" @submit="update_font">
    <h2>Font Theme</h2>
    <p>Choose your font theme:</p>

    <div class="input-group">
      <div class="form-group">
        <label for="sans-serif" :class="picked === 'sans-serif' ? 'cs-active' : ''">
          <div>
            <span>Sans-serif</span>
            <span>Clean and modern, easy to read.</span>
          </div>

          <input type="radio" id="sans-serif" name="font-theme" value="sans-serif" v-model="picked">
        </label>

      </div>
      <div class="form-group">
        <label for="serif" :class="picked === 'serif' ? 'cs-active' : ''">
          <div>
            <span>Serif</span>
            <span>Classic and elegant for a timeless feel.</span>
          </div>
          <input type="radio" id="serif" name="font-theme" value="serif" v-model="picked">
        </label>
      </div>
      <div class="form-group">
        <label for="monospace" :class="picked === 'monospace' ? 'cs-active' : ''">
          <div>
            <span>Monospace</span>
            <span>Code like, great for a technical vibe.</span>
          </div>
          <input type="radio" id="monospace" name="font-theme" value="monospace" v-model="picked">
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