<script setup lang="ts">
import { user, selected_note, auth_status, toast_message } from '@/context'

const { showModal } = defineProps<{
  showModal: (m: string) => void
}>()

async function archive_note(event: Event) {
  try {
    event.preventDefault()

    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/archive`, {
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

    if(response.status === 200) {
      // close modal, display toast
      showModal('')
      toast_message.displayToast(true)
      // display correct message*
      toast_message.changeMessage('Note archived.')
    }

    console.log(data)


  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form action="" @submit="archive_note">
    <div class="text">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z" />
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059" />
        </svg>
      </div>
      <div>
        <h2>Archive note</h2>
        <p>Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it
          anytime.</p>
      </div>
    </div>
    <div class="buttons">
      <button @click="showModal('')" type="button">Cancel</button>
      <button type="submit">Archive Note</button>
    </div>

  </form>
</template>

<style scoped>
form {
  background-color: var(--bodyBackgroundColor);
  border-radius: 10px;

  .text,
  .buttons {
    padding: 20px;
  }

  .text {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 16px;

    h2 {
      margin-bottom: 6px;
      font-size: 16px;
    }

    p {
      font-size: 14px
    }


    div {
      &:nth-of-type(1) {
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--surfaceColorAlt1);
        border-radius: 10px;
      }
    }
  }

  .buttons {
    border-top: 1px solid var(--borderColor);
    display: flex;
    justify-content: end;
    gap: 16px;

    button {
      padding: 12px 16px;
      border-radius: 10px;
      color: #FFF;
    }

    button[type="button"] {
      background-color: var(--surfaceColorAlt1);
      color: var(--textColorAlt3);

    }

    button[type="submit"] {
      background-color: var(--blue-500);
    }
  }

}
</style>