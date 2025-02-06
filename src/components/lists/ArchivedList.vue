<script setup lang="ts">
import { all_notes, selected_note } from '../../context';
import { computed } from 'vue';

const archived_notes = computed(() => {
  return all_notes.notes.filter(item => item.isArchived)
})


</script>

<template>
  <h2>Archived notes</h2>
  <p>All your archived notes are stored here. You can restore or delete them anytime.</p>

  <ul>
    <li v-for="note in archived_notes" :key="note.id" @click="selected_note.changeSelected(note)">
      {{ note.title }}
      <div>
        <span v-for="tag in note.tags" :key="`${note.id}-${tag}`">{{ tag }}</span>
      </div>
      <!-- display date* -->
    </li>
  </ul>
</template>