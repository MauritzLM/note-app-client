<script setup lang="ts">
import { auth_status, selected_note } from '@/context';
import { ref } from 'vue';
import { user } from '@/context';
import DeleteForm from './forms/DeleteForm.vue';
import ArchiveForm from './forms/ArchiveForm.vue';

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

    const response = await fetch('http://localhost:8000/notes/create', {
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
    }

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}

// update note
async function update_note() {
  try {
    const note_to_update = { ...selected_note.note, title: note_title.value, text: editor.value, tags: note_tags.value.split(',').map(t => t.trim()) }

    console.log(note_to_update)

    const response = await fetch('http://localhost:8000/notes/update', {
      method: 'PUT',
      headers: {
        'authorization': `bearer ${user.token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(note_to_update)
    })

    const data = await response.json()

    console.log(data)

    if (response.status === 401) {
      auth_status.logout()
    }

  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div class="top-bar">
    <button class="back-btn" @click="selected_note.changeDisplay(false)">Go back</button>
    <!-- save, archive, delete buttons* -->
    <div v-if="selected_note.isNew">
      <button @click="create_note()">save note</button>
    </div>
    <div v-else>
      <button @click="display_modal('archive')">archive</button>
      <button @click="display_modal('delete')">delete</button>
      <button @click="update_note()">save note</button>
    </div>
  </div>
  <!-- title, tags -->
  <div class="title-section">
    <input type="text" id="note-title" name="note-title" v-model="note_title" placeholder="Enter a title..." required />
    <div class="col-2">
      <div class="form-group">
        <label for="note-tags">Tags</label>
        <input type="text" id="note-tags" name="note-tags" v-model="note_tags"
          placeholder="Add tags seperated by commas (e.g Work, Planning)" required />
      </div>

      <div class="form-group">
        <label for="date">Last Edited</label>
        <span>{{ selected_note.note.date ? new Date(selected_note.note.date).toLocaleString('en-GB', {
          'day': 'numeric', 'month': 'short', 'year': 'numeric'
        }) : 'Not saved yet' }}</span>
      </div>
    </div>
  </div>

  <textarea name="note-text" id="note-text" v-model="editor" placeholder="Start typing your note here"></textarea>


  <!-- delete note modal -->
  <div id="form-modal" v-if="showmodal !== ''">

    <!-- delete form -->
    <DeleteForm v-if="showmodal === 'delete'" :show-modal="display_modal" />

    <!-- archive form -->
    <ArchiveForm v-if="showmodal === 'archive'" :show-modal="display_modal" />

  </div>


  <!-- archive note modal -->

</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--borderColor);

  div {
    display: flex;
    gap: 16px;
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
  }

  .col-2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-group {
    display: grid;
    grid-template-columns: 100px 1fr;
    font-size: 12px;
    align-items: center;

    input {
      padding-left: 0;
      outline: none;
    }

    /* label {
      width: 30%;
    } */
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
}

#form-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.192);
}
</style>