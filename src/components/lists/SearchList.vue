<script setup lang="ts">
import { search_notes } from "@/helpers"
import { all_notes, selected_note } from "@/context"
import { ref, computed } from "vue"

const search_term = ref('')

const filteredNotes = computed(() => {
  return search_notes(search_term.value, all_notes.notes)
})

</script>

<template>
  <h1>Search</h1>
  <input type="text" id="search-input" v-model="search_term">

  <p v-if="search_term !== ''" class="description">All notes matching <span>"{{ search_term }}"</span> are displayed
    below.</p>

  <ul v-if="search_term !== ''">
    <li v-for="note in filteredNotes" :key="note.id" @click="selected_note.changeSelected(note)">
      <h3>{{ note.title }}</h3>
      <div>
        <span v-for="tag in note.tags" :key="`${note.id}-${tag}`">{{ tag }}</span>
      </div>
      <p>{{ new Date(note.date).toLocaleString('en-GB', { 'day': 'numeric', 'month': 'short', 'year': 'numeric' }) }}
      </p>
    </li>
  </ul>

  <!-- add emty search p* -->
</template>

<style scoped>
#search-input {
  margin: 16px 0;
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
</style>