<script setup lang="ts">
import { all_notes, selected_note } from '@/context';
import { computed } from 'vue';

const { tag = '' } = defineProps<{ tag?: string }>()

const tag_notes = computed(() => {
  return all_notes.notes.filter(item => item.tags.includes(tag))
})

</script>

<template>
  <h1>Notes tagged: {{ tag }}</h1>
  <p class="description">All notes with the "{{ tag }}" tag are shown here.</p>

  <ul>
    <li v-for="n in tag_notes" :key="`${n.id}-${n.isArchived}`" @click="selected_note.changeSelected(n)">
      <h3>{{ n.title }}</h3>
      <div>
        <span v-for="tag in n.tags" :key="`${n.id}-${tag}`">{{ tag }}</span>
      </div>
      <p>{{ new Date(n.date).toLocaleString('en-GB', {'day': 'numeric', 'month': 'short', 'year': 'numeric' }) }}</p>
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
