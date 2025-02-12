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

    const response = await fetch('http://localhost:8000/users/changepwd', {
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
      <span>At least 8 characters</span>
    </div>

    <div class="form-group">
      <label for="confirm">Confirm New password</label>
      <input type="password" name="confirm" id="confirm" v-model="confirm_p">
    </div>
    <p>{{ error }}</p>

    <button>submit</button>
  </form>

</template>