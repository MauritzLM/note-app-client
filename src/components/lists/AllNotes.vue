<script setup lang="ts">
import { all_notes, selected_note } from '@/context';

</script>

<template>
  <ul>
    <li v-for="note in all_notes.notes" :key="note.id" @click="selected_note.changeSelected(note)">
      <h3>{{ note.title }}</h3>
      <div>
        <span v-for="tag in note.tags" :key="tag">{{ tag }}</span>
      </div>
      <!-- display date* -->
    </li>
  </ul>
</template>
