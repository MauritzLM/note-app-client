<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
  <header>

    <div class="wrapper">

      <!-- mobile buttons: [all notes, archived, search, tags, settings] -->

      <nav>
        <RouterLink to="/all/all">All notes</RouterLink>
        <RouterLink to="/archived/archived">Archived notes</RouterLink>
        <RouterLink to="/search/search">Search</RouterLink>
        <RouterLink to="/tags/tags">Tags</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <!-- tag list -->
      </nav>
    </div>
  </header>
</template>
