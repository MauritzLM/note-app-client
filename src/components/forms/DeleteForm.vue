<script setup lang="ts">
import { user, auth_status, selected_note } from '@/context';

defineProps<{
  showModal: (m: string) => void
}>()

// delete function
async function delete_note(event: Event) {
  try {
    event.preventDefault()
    
    const response = await fetch('http://localhost:8000/notes/delete', {
      method: 'POST',
      headers: {
        'authorization': `bearer ${user.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ id: selected_note.note.id })
    })

    const data = await response.json()

    if (response.status === 401) {
      auth_status.logout()
    }

    // close modal / refresh*

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
<form action="" @submit="delete_note">
  <h2>Delete note</h2>
  <p>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
  <div>
    <button @click="showModal('')" type="button">Cancel</button>
    <button>Delete Note</button>
  </div>

</form>
</template>
