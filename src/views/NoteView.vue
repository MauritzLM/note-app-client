<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import { auth_status, user, all_notes } from '../context.ts'
import { watch, ref } from 'vue'
import { type noteObj } from '../types.ts'

const editor = ref('# Hey')

function select_note(note: noteObj) {
    editor.value = note.text
}

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
    <!-- notes list -->
    <ul v-if="$route.params.list === 'all'">
      <li v-for="note in all_notes.notes" :key="note.id" @click="select_note(note)">
        <h3>{{ note.title }}</h3>
        <div>
          <span v-for="tag in note.tags" :key="tag">{{ tag }}</span>
        </div>
        <!-- display date* -->
      </li>
  
   </ul>
   
   <!-- editor -->
   <div class="editor">
     <textarea class="" v-model="editor"></textarea>
   </div>

  </main>
</template>
