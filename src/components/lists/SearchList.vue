<script setup lang="ts">
import { search_notes } from "@/helpers"
import { selected_note } from "@/context"
import { ref, computed } from "vue"
import { type noteObj } from "@/types";

const { notes } = defineProps<{
  notes: noteObj[]
}>()

const search_term = ref('')

const filteredNotes = computed(() => {
  return search_notes(search_term.value, notes)
})

</script>

<template>
  <h1>Search</h1>
  <div class="input-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path fill="#0E121B" fill-rule="evenodd"
        d="M11.248 3.5a7.289 7.289 0 1 0 0 14.577 7.289 7.289 0 0 0 0-14.577ZM2.46 10.79a8.789 8.789 0 1 1 17.577 0 8.789 8.789 0 0 1-17.577 0Z"
        clip-rule="evenodd" />
      <path fill="#0E121B" fill-rule="evenodd" d="m16.736 15.648 5.616 5.6-1.06 1.063-5.615-5.601 1.06-1.062Z"
        clip-rule="evenodd" />
    </svg>
    <input data-test="search" type="text" id="search-input" v-model="search_term">
  </div>

  <p v-if="search_term !== ''" class="description">All notes matching <span>"{{ search_term }}"</span> are displayed
    below.</p>

  <ul v-if="search_term !== ''">
    <li data-test="note" v-for="note in filteredNotes" :key="note.id" @click="selected_note.changeSelected(note)">
      <h3 data-test="title">{{ note.title }}</h3>
      <div>
        <span v-for="tag in note.tags" :key="`${note.id}-${tag}`">{{ tag }}</span>
      </div>
      <p>{{ new Date(note.date).toLocaleString('en-GB', { 'day': 'numeric', 'month': 'short', 'year': 'numeric' }) }}
      </p>
    </li>
  </ul>

  <!-- empty search -->
  <div data-test="empty" v-if="filteredNotes.length === 0" class="no-match">
    No notes match your search.
  </div>

  <div v-if="search_term === ''" class="no-match">
    Search by name or tag.
  </div>
</template>

<style scoped>
#search-input {
  margin: 16px 0;
  padding-left: 44px;
  height: 52px;
  border-radius: 10px;
  background-color: var(--bannerColor);
}

.input-wrapper {
  position: relative;

  svg {
    position: absolute;
    top: 30px;
    left: 16px;

    path {
      fill: var(--neutral-500);
    }
  }
}

.description {
  span {
    color: var(--textColorMain);
  }
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

.no-match {
  padding: 8px;
  background-color: var(--bannerColor);
  border: 1px solid var(--borderColor);
  border-radius: 10px;
  margin-bottom: 16px;
}

/* desktop styles */
@media screen and (min-width: 1000px) {

  .input-wrapper,
  .no-match {
    max-width: 600px;
  }
}
</style>