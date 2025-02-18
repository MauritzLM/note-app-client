<script setup lang="ts">
import { ref } from 'vue';
import { user, auth_status, toast_message } from '@/context';

const { current_theme = '' } = defineProps<{ current_theme?: string }>()

const picked = ref(current_theme)

// update color theme function
async function update_theme(event: Event) {
  try {
    event.preventDefault()

    if (picked.value === user.theme) {
      return
    }
    const response = await fetch('http://127.0.0.1/users/color', {
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
      toast_message.displayToast(true)
      toast_message.changeMessage('Settings updated successfully!')

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12.055 3v1.372m0 15.256V21m9-9h-1.372M4.427 12H3.055m15.364-6.364-.97.97M6.66 17.394l-.97.97m12.728 0-.97-.97M6.66 6.606l-.97-.97" />
              <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12.055 7.805a4.195 4.195 0 1 1 0 8.39 4.195 4.195 0 0 1 0-8.39Z" clip-rule="evenodd" />
            </svg>
          </div>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="#0E121B"
                d="M12.614 21.723c-2.53 0-5.03-.97-6.89-2.84-1.86-1.87-2.85-4.28-2.85-6.88 0-2.6 1.01-5.04 2.85-6.88 3.05-3.06 7.82-3.73 11.59-1.63.26.15.44.48.41.78-.03.33-.25.6-.57.7-3.05.94-5.19 3.83-5.19 7.03 0 3.21 2.14 6.1 5.19 7.02.29.09.53.38.57.68.04.3-.14.65-.4.8-1.47.82-3.1 1.22-4.71 1.22Zm0-17.94c-2.14 0-4.25.83-5.83 2.4-1.58 1.57-2.41 3.62-2.41 5.82s.85 4.27 2.41 5.82c2.21 2.21 5.49 2.94 8.39 1.99-2.83-1.51-4.7-4.52-4.7-7.81s1.87-6.3 4.69-7.82c-.83-.27-1.7-.4-2.55-.4Zm3.97 1.02s.01 0 .02.01c0 0-.01 0-.02-.01ZM18.974 19.052c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06 8.179 8.179 0 0 0 2.41-5.81c0-2.19-.85-4.26-2.41-5.81a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0a9.653 9.653 0 0 1 2.85 6.87c0 2.59-1.01 5.04-2.85 6.87-.15.15-.34.22-.53.22Z" />
            </svg>
          </div>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="#0E121B"
                d="M5.47 19.825c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l14.12-14.12c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L6 19.605c-.15.15-.34.22-.53.22ZM3.61 15.325a.752.752 0 0 1-.3-1.44c.38-.16.84 0 1.01.38.17.38.01.81-.37.98l-.04.02c-.1.04-.2.06-.3.06Zm.05-6.68a.766.766 0 0 1-.7-1.05c.16-.38.59-.56.97-.4h.03c.38.17.56.61.4.99-.12.29-.4.46-.69.46h-.01Zm4.69-4.7c-.29 0-.57-.17-.69-.45-.16-.38 0-.84.38-1 .38-.17.82 0 .98.38v.03a.739.739 0 0 1-.68 1.05l.01-.01Zm6.64-.03c-.09 0-.18-.02-.27-.05-.38-.16-.57-.57-.41-.95l.02-.06c.16-.38.6-.56.98-.4.38.16.56.6.4.98-.12.29-.42.48-.72.48ZM16.99 21.604h-.05c-2.42-.22-4.42-2.03-4.87-4.4a.75.75 0 0 1 .6-.88c.4-.07.8.19.88.6a3.95 3.95 0 0 0 2.03 2.74c-.44-1.42-.24-3.02.63-4.31a4.992 4.992 0 0 1 3.78-2.16c-.89-.76-2.1-1.11-3.3-.88-.4.07-.8-.19-.88-.6a.75.75 0 0 1 .6-.88c2.37-.45 4.79.74 5.88 2.9.14.27.09.63-.11.86-.2.23-.55.33-.84.23-1.43-.44-3.03.12-3.89 1.38-.86 1.26-.79 2.96.16 4.13.19.23.22.59.08.86-.13.25-.42.41-.69.41h-.01ZM7.99 13.784c-.19 0-.38-.07-.53-.22a4.762 4.762 0 0 1 0-6.72 4.762 4.762 0 0 1 6.72 0c.29.29.29.77 0 1.06-.29.29-.77.29-1.06 0a3.253 3.253 0 0 0-4.6 4.6c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22Z" />
            </svg>
          </div>
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
    display: grid;
    grid-template-columns: 40px 1fr 20px;
    gap: 16px;
    align-items: center;
    padding: 16px;
    border: 1px solid var(--borderColor);
    border-radius: 10px;
    cursor: pointer;

    div {
      &:nth-of-type(1) {
        height: 40px;
        width: 40px;
        border: 1px solid var(--borderColor);
        border-radius: 10px;
        background-color: var(--bodyBackgroundColor);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        &:nth-of-type(2) {
          font-size: 12px;
        }
      }
    }

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