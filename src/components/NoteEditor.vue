<script setup lang="ts">
import { all_notes, auth_status, selected_note, toast_message } from '@/context';
import { ref } from 'vue';
import { user } from '@/context';
import DeleteForm from './forms/DeleteForm.vue';
import ArchiveForm from './forms/ArchiveForm.vue';
import type { noteObj } from '@/types';

const { title = '', note_text = '', tags = [] } = defineProps<{ title?: string, note_text?: string, tags: string[] }>()

// note title
const note_title = ref(title)
// note tags
const note_tags = ref(tags.join(', '))
// note text
const editor = ref(note_text)
// delete modal
const showmodal = ref('')


function display_modal(m: string) {
  showmodal.value = m
}

// create new note
async function create_note() {
  try {

    const new_note = {
      title: note_title.value,
      text: editor.value,
      tags: note_tags.value.split(',').map(t => t.trim())
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/create`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${user.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(new_note)
    })

    const data = await response.json()

    if (response.status === 401) {
      auth_status.logout()
    }

    // change new note state
    if (response.status === 200) {
      selected_note.changeSelected({ ...selected_note.note, ...new_note })
      toast_message.changeMessage('Note created successfully!')
      toast_message.displayToast(true)

      // add new note to all notes
      const new_notes = [...all_notes.notes, data.note]
      all_notes.updateNotes(new_notes)
    }

  } catch (error) {
    console.log(error)
  }
}

// update note
async function update_note() {
  try {
    const note_to_update = { ...selected_note.note, title: note_title.value, text: editor.value, tags: note_tags.value.split(',').map(t => t.trim()) }

    console.log(note_to_update)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/update`, {
      method: 'PUT',
      headers: {
        'authorization': `bearer ${user.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(note_to_update)
    })

    // const data = await response.json()

    if (response.status === 401) {
      auth_status.logout()
    }

    if (response.status === 200) {
      toast_message.changeMessage('Note saved successfully!')
      toast_message.displayToast(true)
      // update all notes
      // create new updated note obj
      const updated_note: noteObj = { ...selected_note.note, title: note_title.value, text: editor.value, tags: note_tags.value.split(',').map(t => t.trim()) }
      // remove old note
      const new_notes = all_notes.notes.filter(item => item.id !== selected_note.note.id)

      all_notes.updateNotes([...new_notes, updated_note])
    }

  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div class="top-bar">
    <button class="back-btn" @click="selected_note.changeDisplay(false)">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path fill="#000" fill-rule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
          clip-rule="evenodd" />
      </svg>
      <span>Go back</span>
    </button>
    <!-- save, archive, delete buttons* -->
    <div v-if="selected_note.isNew">
      <button data-test="save" class="save-btn" @click="create_note()">Save Note</button>
    </div>
    <div v-else>
      <button @click="display_modal('delete')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 24 25">
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509" />
        </svg>
      </button>
      <button @click="display_modal('archive')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z" />
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059" />
        </svg>
      </button>
      <button data-test="save" class="save-btn" @click="update_note()">Save Note</button>
    </div>
  </div>
  <!-- title, tags -->
  <div class="title-section">
    <input data-test="note-title" type="text" id="note-title" name="note-title" v-model="note_title"
      placeholder="Enter a title..." required />
    <div class="col-2">
      <div class="form-group">
        <label for="note-tags">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24">
            <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
              clip-rule="evenodd" />
            <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
              clip-rule="evenodd" />
          </svg>
          <span>Tags</span>
        </label>
        <textarea data-test="note-tags" name="note-tags" id="note-tags" v-model="note_tags"
          placeholder="Add tags seperated by commas (e.g Work, Planning)" required></textarea>
        <!-- <input type="text" id="note-tags" name="note-tags" v-model="note_tags"
          placeholder="Add tags seperated by commas (e.g Work, Planning)" required /> -->
      </div>

      <!-- add archived status if note is archived* -->
      <div class="form-group">
        <label for="date">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12.2505 3.75C7.69378 3.75 4.00049 7.44329 4.00049 12C4.00049 16.5558 7.69384 20.25 12.2505 20.25C16.8072 20.25 20.5005 16.5558 20.5005 12C20.5005 7.44329 16.8072 3.75 12.2505 3.75ZM2.50049 12C2.50049 6.61487 6.86536 2.25 12.2505 2.25C17.6356 2.25 22.0005 6.61487 22.0005 12C22.0005 17.3841 17.6357 21.75 12.2505 21.75C6.8653 21.75 2.50049 17.3841 2.50049 12Z"
              fill="#2B303B" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.9224 7.82666C12.3366 7.82666 12.6724 8.16245 12.6724 8.57666V12.2493L15.4819 13.9283C15.8375 14.1408 15.9535 14.6013 15.741 14.9569C15.5285 15.3124 15.068 15.4284 14.7124 15.2159L11.5376 13.3186C11.3111 13.1832 11.1724 12.9388 11.1724 12.6748V8.57666C11.1724 8.16245 11.5082 7.82666 11.9224 7.82666Z"
              fill="#2B303B" />
          </svg>

          <span>Last Edited</span>
        </label>
        <span data-test="note-date">{{ selected_note.note.date ? new
          Date(selected_note.note.date).toLocaleString('en-GB', {
            'day': 'numeric', 'month': 'short', 'year': 'numeric'
          }) : 'Not saved yet' }}</span>
      </div>
    </div>
  </div>

  <textarea data-test="note-content" name="note-text" id="note-text" v-model="editor"
    placeholder="Start typing your note here" rows="1"></textarea>


  <!-- delete note modal -->
  <div id="form-modal" v-if="showmodal !== ''">

    <!-- delete form -->
    <DeleteForm v-if="showmodal === 'delete'" :show-modal="display_modal" />

    <!-- archive form -->
    <ArchiveForm v-if="showmodal === 'archive'" :show-modal="display_modal" />

  </div>

</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--borderColor);
  color: var(--textColorAlt2);

  div {
    display: flex;
    gap: 16px;
  }

  svg {
    path {
      stroke: var(--textColorAlt2);
    }
  }

  .back-btn {
    display: flex;
    align-items: center;
    color: var(--textColorAlt2);
    gap: 6px;

    svg {
      path {
        fill: var(--textColorAlt2);
        stroke: none;
      }

    }
  }

  .save-btn {
    color: var(--blue-500);
    align-self: start;
  }

}

.title-section {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  /* gap: 12px; */
  border-bottom: 1px solid var(--borderColor);

  #note-title {
    font-size: 24px;
    font-weight: 700;
    padding-left: 0;
    outline: none;
    margin-bottom: 10px;
  }

  .col-2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-group {
    display: grid;
    grid-template-columns: 150px 1fr;
    column-gap: 8px;
    font-size: 14px;
    align-items: start;
    color: var(--descriptionTextColor);

    input {
      padding-left: 0;
      outline: none;
    }

    textarea {
      outline: none;
      padding: 0;
    }

    svg {
      path {
        stroke: var(--descriptionTextColor);
      }
    }

    label {
      display: flex;
      align-items: center;
      gap: 6px;

    }
  }
}

#note-text {
  appearance: none;
  padding: 12px 0;
  display: block;
  overflow: auto;
  outline: none;
  color: var(--editorTextColor);
  flex: auto;
}

input,
textarea {
  border: none;
  width: 100%;
  background-color: var(--bodyBackgroundColor);
  color: var(--editorTextColor)
}

#form-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.192);
  padding: 16px;
}
</style>