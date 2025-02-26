<script setup lang="ts">
import { selected_note } from '../../context';
import { type noteObj } from '@/types';
import { computed } from 'vue';

const { notes } = defineProps<{
  notes: noteObj[]
}>()

const archived_notes = computed(() => {
  return notes.filter(item => item.isArchived)
})


</script>

<template>
  <h1>Archived Notes</h1>
  <p class="description">All your archived notes are stored here. You can restore or delete them anytime.</p>

  <div v-if="notes.length === 0" class="empty-msg">
      <p>No notes have been archived yet. Move notes here for safekeeping.</p>
  </div>
  <ul vi-else>
    <li data-test="note" v-for="note in archived_notes" :key="note.id" @click="selected_note.changeSelected(note)">
      <h3 data-test="title">{{ note.title }}</h3>
      <div>
        <span v-for="tag in note.tags" :key="`${note.id}-${tag}`">{{ tag }}</span>
      </div>
      <p data-test="date">{{ new Date(note.date).toLocaleString('en-GB', {
        'day': 'numeric', 'month': 'short', 'year':
          'numeric' }) }}
      </p>
    </li>
  </ul>
</template>

<style scoped>
.empty-msg {
  padding: 8px;
  background-color: var(--bannerColor);
  border: 1px solid var(--borderColor);
  border-radius: 10px;
  margin: 16px 0;
}

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