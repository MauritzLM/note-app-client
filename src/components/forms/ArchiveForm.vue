<script setup lang="ts">
import { user, selected_note, auth_status } from '@/context'

defineProps<{
  showModal: (m: string) => void
}>()

async function archive_note(event: Event) {
  try {
    event.preventDefault()

    const response = await fetch('http://localhost:8000/notes/archive', {
      method: 'PUT',
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
  <form action="" @submit="archive_note">
      <h2>Archive note</h2>
      <p>Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it
        anytime.</p>
      <div>
        <button @click="showModal('')" type="button">Cancel</button>
        <button>Archive Note</button>
      </div>

    </form>
</template>