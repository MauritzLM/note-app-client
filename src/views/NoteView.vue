<script setup lang="ts">
import SearchList from '@/components/lists/SearchList.vue'
import ArchivedList from '@/components/lists/ArchivedList.vue'
import AllNotes from '@/components/lists/AllNotes.vue'
import TagList from '@/components/lists/TagList.vue'
import NoteEditor from '@/components/NoteEditor.vue'
import { auth_status, user, all_notes, selected_note, toast_message } from '../context.ts'

async function get_all_notes() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/all`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (response.status === 200) {
      all_notes.updateNotes(data)
      return
    }

    if (response.status === 401) {
      auth_status.logout()
    }
  }
  catch (error) {
    console.log(error)
  }
}

if (all_notes.notes.length === 0) {
  get_all_notes()
}

</script>

<template>
  <main>
    <!-- notes list render list depending on params -->
    
    <div data-test="current-list" :class="selected_note.displayEditor ? 'hide' : 'current-list'">
      <!-- all notes list -->
      <AllNotes v-if="$route.params.list === 'all'" :notes="all_notes.notes" />

      <!-- Search list -->
      <SearchList v-if="$route.params.list === 'search'" :notes="all_notes.notes" />

      <!-- Archived notes list -->
      <ArchivedList v-if="$route.params.list === 'archived'" :notes="all_notes.notes" />

      <!-- Tag list -->
      <TagList v-if="$route.params.list === 'tags'" :notes="all_notes.notes" />
    </div>

    <div :class="selected_note.displayEditor ? 'editor' : 'hide'">

      <!-- editor -->
      <NoteEditor :title="selected_note.note.title" :note_text="selected_note.note.text" :tags="selected_note.note.tags"
        :key="selected_note.note.title" />
    </div>

    <!-- new note button -->
    <button :class="selected_note.displayEditor ? 'hide' : 'new-btn'" @click="selected_note.newNote()">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24">
        <path fill="#FFF"
          d="M12 5a.75.75 0 0 1 .75.75V11H18a.75.75 0 0 1 0 1.5h-5.25v5.25a.75.75 0 0 1-1.5 0V12.5H6A.75.75 0 0 1 6 11h5.25V5.75A.75.75 0 0 1 12 5Z" />
      </svg>
    </button>

    <!-- toast -->
    <div v-if="toast_message.showToast" class="toast">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path fill="#0E121B" fill-rule="evenodd"
          d="m15.993 10.222-4.618 4.618a.746.746 0 0 1-1.061 0l-2.309-2.309a.75.75 0 0 1 1.06-1.061l1.78 1.779 4.087-4.088a.75.75 0 1 1 1.061 1.061ZM12 2.5c-5.238 0-9.5 4.262-9.5 9.5 0 5.239 4.262 9.5 9.5 9.5s9.5-4.261 9.5-9.5c0-5.238-4.262-9.5-9.5-9.5Z"
          clip-rule="evenodd" />
      </svg>
      <span>{{ toast_message.currentMsg }}</span>
      <button @click="toast_message.displayToast(false)">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  </main>
</template>

<style scoped>
.hide {
  display: none;
}

.current-list {
  padding: 20px 16px;
}

.editor {
  padding: 20px 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.new-btn {
  position: absolute;
  right: 20px;
  bottom: 100px;
  background-color: var(--blue-500);
  border-radius: 50%;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.toast {
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--borderColor);
  border-radius: 10px;
  position: absolute;
  bottom: 70px;
  right: 20px;
  min-width: 270px;
  font-size: 14px;
  background-color: var(--bodyBackgroundColor);

  svg {
    path {
      fill: var(--green-500)
    }
  }


  button {
    justify-self: end;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>
