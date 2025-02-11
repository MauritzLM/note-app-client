<script setup lang="ts">
import SearchList from '@/components/lists/SearchList.vue'
import ArchivedList from '@/components/lists/ArchivedList.vue'
import AllNotes from '@/components/lists/AllNotes.vue'
import TagList from '@/components/lists/TagList.vue'
import NoteEditor from '@/components/NoteEditor.vue'
import { auth_status, user, all_notes, selected_note } from '../context.ts'
import { watch } from 'vue'


async function get_all_notes() {
  try {
    const response = await fetch('http://localhost:8000/notes/all', {
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

get_all_notes()

watch(user, get_all_notes, { immediate: true })

</script>

<template>
  <main>
    <!-- notes list render list depending on params -->
    <h1>Note view</h1>

    <div class="current-list">
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
      <NoteEditor :title="selected_note.note.title" :note_text="selected_note.note.text"
        :tags="selected_note.note.tags" :key="selected_note.note.title"/>
    </div>

    <!-- new note button -->
    <button :class="selected_note.displayEditor ? 'editor' : 'hide'" @click="selected_note.newNote()">New</button>
  </main>
</template>

<style scoped>
.hide {
  display: none;
}
</style>
