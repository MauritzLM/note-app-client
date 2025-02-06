<script setup lang="ts">
import SearchList from '@/components/lists/SearchList.vue'
import ArchivedList from '@/components/lists/ArchivedList.vue'
import AllNotes from '@/components/lists/AllNotes.vue'
import TagList from '@/components/lists/TagList.vue'
import { auth_status, user, all_notes, selected_note } from '../context.ts'
import { watch, ref, computed } from 'vue'

// note text
const note_text = computed({
  get: () => selected_note.note.text,
  set: (val) => val
})

// compute tags*



const editor = ref(note_text)

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
    <!-- all notes list -->
    <AllNotes v-if="$route.params.list === 'all'" />

    <!-- Search list -->
    <SearchList v-if="$route.params.list === 'search'" />

    <!-- Archived notes list -->
    <ArchivedList v-if="$route.params.list === 'archived'" />

    <!-- Tag list -->
    <TagList v-if="$route.params.list === 'tags'" />

    <!-- mobile editor buttons -->
    <div class="editor" v-if="selected_note.displayEditor">
      <div>
        <button @click="selected_note.changeDisplay(false)">Go back</button>
        <!-- save, archive, delete buttons* -->
      </div>
      <!-- editor -->

      <textarea class="" v-model="editor"></textarea>
    </div>

  </main>
</template>
