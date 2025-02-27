<script setup lang="ts">
import { user, auth_status, selected_note, toast_message, all_notes } from '@/context';

const { showModal } = defineProps<{
  showModal: (m: string) => void
}>()

// delete function
async function delete_note(event: Event) {
  try {
    event.preventDefault()

    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/delete`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${user.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ id: selected_note.note.id })
    })

    // const data = await response.json()

    if (response.status === 401) {
      auth_status.logout()
    }

    // close modal / display toast
    if (response.status === 200) {
      showModal('')
      toast_message.changeMessage('Note permanently deleted.')
      toast_message.displayToast(true)

      // remove deleted note from all notes
      const new_notes = all_notes.notes.filter(item => item.id !== selected_note.note.id)
      all_notes.updateNotes(new_notes)
      selected_note.noteDeleted()
    }

  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form data-test="form" action="" @submit="delete_note">
    <div class="text">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none" viewBox="0 0 24 25">
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509" />
        </svg>
      </div>
      <div>
        <h2>Delete note</h2>
        <p>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
      </div>
    </div>
    <div class="buttons">
      <button data-test="cancel" @click="showModal('')" type="button">Cancel</button>
      <button type="submit">Delete Note</button>
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
      background-color: var(--red-500);
    }
  }

}
</style>
