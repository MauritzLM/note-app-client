<script setup lang="ts">
import { search_notes } from "@/helpers"
import { all_notes, selected_note } from "@/context"
import { ref, computed } from "vue"

const search_term = ref('')

const filteredNotes = computed(() => {
  return search_notes(search_term.value, all_notes.notes)
})

</script>

<template>
  <input type="text" v-model="search_term">

  <p>All notes matching {{ search_term }}</p>

  <ul v-if="search_term !== ''">
    <li v-for="note in filteredNotes" :key="note.id" @click="selected_note.changeSelected(note)">
      {{ note.title }}
      <div>
        <span v-for="tag in note.tags" :key="`${note.id}-${tag}`">{{ tag }}</span>
      </div>
      <p>{{ note.date }}</p>
    </li>
  </ul>
</template>