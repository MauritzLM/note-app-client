<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
  <header>

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <!-- mobile buttons: [all notes, archived, search, tags, settings] -->

      <nav>
        <button>All notes</button>
        <button>Archived notes</button>
        <button>Search</button>
        <button>Tags</button>
        <RouterLink to="/settings">Settings</RouterLink>
        <!-- tag list -->
      </nav>
    </div>
  </header>
</template>
