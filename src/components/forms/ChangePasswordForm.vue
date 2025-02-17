<script setup lang="ts">
import { ref } from 'vue';
import { user, auth_status } from '@/context';

const old_p = ref('')
const new_p = ref('')
const confirm_p = ref('')

const error = ref('')

async function change_password(event: Event) {
  try {
    event.preventDefault()

    const response = await fetch('http://127.0.0.1/users/changepwd', {
      method: 'POST',
      headers: {
        'authorization': `bearer ${user.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ old: old_p.value, new: new_p.value, confirm: confirm_p.value })

    })

    const data = await response.json()

    if (response.status === 400) {
      error.value = data.detail
    }

    if (response.status === 401) {
      auth_status.logout()
    }

    // reset values
    if (response.status === 200) {
      old_p.value = ''
      new_p.value = ''
      error.value = ''
      confirm_p.value = ''
    }

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form action="" @submit="change_password">
    <h2>Change password</h2>

    <div class="form-group">
      <label for="old">Old password</label>
      <input type="password" name="old" id="old" v-model="old_p">
    </div>

    <div class="form-group">
      <label for="new">New password</label>
      <input type="password" name="new" id="new" v-model="new_p">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24">
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063" />
        </svg>
        <span>At least 8 characters</span>
      </div>
    </div>

    <div class="form-group">
      <label for="confirm">Confirm New password</label>
      <input type="password" name="confirm" id="confirm" v-model="confirm_p">
    </div>
    <p>{{ error }}</p>

    <button class="btn-primary">Save Password</button>
  </form>

</template>

<style scoped>
form {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  h2 {
    font-size: 24px;

  }

  .form-group {
    label {
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 14px;
    }

    div {
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--textColorAlt2);
    }
  }

  input {
    border-radius: 10px;
    margin-top: 10px;
  }

  button {
    justify-self: end;
  }
}
</style>