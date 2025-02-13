<script setup lang="ts">
import { all_notes, selected_note } from '@/context';

</script>

<template>
  <h1>All Notes</h1>
  <ul>
    <li v-for="note in all_notes.notes" :key="note.id" @click="selected_note.changeSelected(note)">
      <h3>{{ note.title }}</h3>
      <div>
        <span v-for="tag in note.tags" :key="tag">{{ tag }}</span>
      </div>
      <p>{{ new Date(note.date).toLocaleString('en-GB', { 'day': 'numeric', 'month': 'short', 'year': 'numeric' }) }}
      </p>
    </li>
  </ul>
</template>

<style scoped>
ul {

  li {
    border-bottom: 1px solid var(--borderColor);
    padding: 12px 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 12px;

    div {
      display: flex;
      gap: 4px;

      span {
        background-color: var(--tagBackground);
        border-radius: 5px;
        padding: 2px 6px;
        font-size: 12px;
      }
    }

    p {
      font-size: 12px;
      color: var(--textColorAlt1);
    }
  }
}
</style>
