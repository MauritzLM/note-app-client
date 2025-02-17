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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
            d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
            clip-rule="evenodd" />
          <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
            d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
            clip-rule="evenodd" />
        </svg>
        <span>{{ tag }}</span>
      </li>
    </ul>
  </div>

  <button v-if="selected_tag !== ''" @click="changeTag('')" class="back-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path fill="#000" fill-rule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
        clip-rule="evenodd" />
    </svg>
    <span>Go back</span>
  </button>
  <!-- if tag selected -->
  <SelectedTagList :tag="selected_tag" v-if="selected_tag !== ''" />
</template>

<style scoped>
.hide {
  display: none;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--textColorAlt2);
  margin-bottom: 16px;
}

ul {
  margin-top: 20px;

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

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>