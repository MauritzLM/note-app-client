<script setup lang="ts">
import SearchList from '@/components/lists/SearchList.vue'
import ArchivedList from '@/components/lists/ArchivedList.vue'
import AllNotes from '@/components/lists/AllNotes.vue'
import TagList from '@/components/lists/TagList.vue'
import NoteEditor from '@/components/NoteEditor.vue'
import { auth_status, user, all_notes, selected_note } from '../context.ts'
// import { useRoute } from 'vue-router'
// import { computed } from 'vue'

// const current_route = useRoute()

// const page_heading = computed(() => {
//   if (current_route === 'all') {
//     return 'All notes'
//   }
// })

async function get_all_notes() {
  try {
    const response = await fetch('http://127.0.0.1/notes/all', {
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

if (all_notes.notes.length <= 1) {
  get_all_notes()
}

// watch(() => route.params.list, get_all_notes, { immediate: true, once: true })

</script>

<template>
  <main>
    <!-- notes list render list depending on params -->
    <!-- <h1>{{ current_route.params.list }} Notes</h1> -->

    <div :class="selected_note.displayEditor ? 'hide' : 'current-list'">
      <!-- all notes list -->
      <AllNotes v-if="$route.params.list === 'all'" />

      <!-- Search list -->
      <SearchList v-if="$route.params.list === 'search'" />

      <!-- Archived notes list -->
      <ArchivedList v-if="$route.params.list === 'archived'" />

      <!-- Tag list -->
      <TagList v-if="$route.params.list === 'tags'" />
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

    <!-- toast* -->
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
</style>
