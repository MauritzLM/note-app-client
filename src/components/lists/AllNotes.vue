<script setup lang="ts">
import { selected_note } from '@/context';
import { type noteObj } from '@/types';

// props -> all notes
defineProps<{
  notes?: noteObj[]
}>()

</script>

<template>
  <h1>All Notes</h1>
  <ul>
    <li data-test="note" v-for="note in notes" :key="note.id" @click="selected_note.changeSelected(note)">
      <h3 data-test="title">{{ note.title }}</h3>
      <div>
        <span v-for="tag in note.tags" :key="tag">{{ tag }}</span>
      </div>
      <p data-test="date">{{ new Date(note.date).toLocaleString('en-GB', { 'day': 'numeric', 'month': 'short', 'year': 'numeric' }) }}
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
