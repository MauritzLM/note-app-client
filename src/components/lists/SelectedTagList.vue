<script setup lang="ts">
import { all_notes, selected_note } from '@/context';
import { computed } from 'vue';

const { tag = '' } = defineProps<{ tag?: string }>()

const tag_notes = computed(() => {
  return all_notes.notes.filter(item => item.tags.includes(tag))
})

</script>

<template>
  <h2>Notes tagged: {{ tag }}</h2>

  <ul>
    <li v-for="n in tag_notes" :key="`${n.id}-${n.isArchived}`" @click="selected_note.changeSelected(n)">
      {{ n.title }}
      <div>
        <span v-for="tag in n.tags" :key="`${n.id}-${tag}`">{{ tag }}</span>
      </div>
      <p>{{ n.date }}</p>
    </li>
  </ul>
</template>
