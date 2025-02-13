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
  <div :class="selected_tag === '' ? '' : 'hide'">
    <h1>Tags</h1>
    <ul>
      <li v-for="tag in tag_list" :key="tag" @click="changeTag(tag)">
        <img src="/images/icon-tag.svg" alt="" height="20px" width="20px" decoding="async" aria-hidden="true">
        <span>{{ tag }}</span>
      </li>
    </ul>
  </div>

  <button v-if="selected_tag !== ''" @click="changeTag('')">All tags</button>
  <!-- if tag selected -->
  <SelectedTagList :tag="selected_tag" v-if="selected_tag !== ''" />
</template>

<style scoped>
.hide {
  display: none;
}

ul {
  li {
    border-bottom: 1px solid var(--borderColor);
    padding: 15px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    span {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>