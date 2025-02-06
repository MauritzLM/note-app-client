<script setup lang="ts">
import { all_notes } from '@/context';
import { computed, ref } from 'vue';
import SelectedTagList from './SelectedTagList.vue';

// get all tags
const tag_list = computed(() => {
  const new_arr: string[] = []

  all_notes.notes?.forEach(n => {
    n.tags?.forEach(t => {
      if (t !== '') {
        new_arr.push(t)
      }
    })
  })

  // return unique array
  return [...new Set(new_arr)]
})

const selected_tag = ref('')

function changeTag(t: string) {
  selected_tag.value = t
}

</script>

<template>
  <h2>Tags</h2>

  <ul>
    <li v-for="tag in tag_list" :key="tag" @click="changeTag(tag)">
      {{ tag }}
    </li>
  </ul>

  <button v-if="selected_tag !== ''" @click="changeTag('')">Go back</button>
  <!-- if tag selected -->
  <SelectedTagList :tag="selected_tag" v-if="selected_tag !== ''" />
</template>