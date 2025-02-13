<script setup lang="ts">
import { selected_note } from '@/context';
import { RouterLink } from 'vue-router';

</script>

<template>
  <header>

    <div class="wrapper">
      <div class="banner">
        <img src="/images/logo.svg" alt="">
      </div>

      <!-- mobile buttons: [all notes, archived, search, tags, settings] -->

      <nav>
        <RouterLink @click="selected_note.changeDisplay(false)" :class="$route.params.list === 'all' ? 'cs-active' : ''" to="/all/all">
          <img src="/images/icon-home.svg" alt="home" width="24" height="24" decoding="async" loading="eager">
          <span>Home</span>
        </RouterLink>

        <RouterLink @click="selected_note.changeDisplay(false)" :class="$route.params.list === 'archived' ? 'cs-active' : ''" to="/archived/archived">
          <img src="/images/icon-archive.svg" alt="archived" width="24" height="24" decoding="async" loading="eager">
          <span>Archived</span>
        </RouterLink>

        <RouterLink @click="selected_note.changeDisplay(false)" :class="$route.params.list === 'search' ? 'cs-active' : ''" to="/search/search">
          <img src="/images/icon-search.svg" alt="search" width="24" height="24" decoding="async" loading="eager">
          <span>Search</span>
        </RouterLink>

        <RouterLink @click="selected_note.changeDisplay(false)" :class="$route.params.list === 'tags' ? 'cs-active' : ''" to="/tags/tags">
          <img src="/images/icon-tag.svg" alt="tags" width="24" height="24" decoding="async" loading="eager">
          <span>Tags</span>
        </RouterLink>

        <RouterLink :class="$route.params.list === 'settings' ? 'cs-active' : ''" to="/settings">
          <img src="/images/icon-settings.svg" alt="settings" width="24" height="24" decoding="async" loading="eager">
          <span>Settings</span>
        </RouterLink>
        <!-- tag list -->
      </nav>
    </div>
  </header>
</template>

<style>
header {
  background-color: var(--bodyBackgroundColor);

  .banner {
    background-color: var(--bannerColor);
    padding: 13px 16px;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 0px -4px 6px #f0f0f09d;
    width: 100%;
    z-index: 100;
    background-color: var(--bodyBackgroundColor);

    a {
      padding: 4px 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      span {
        display: none;
      }

    }

    .cs-active {
      background-color: var(--selectedSurface);
    }
  }
}
</style>
