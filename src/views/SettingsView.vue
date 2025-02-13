<script setup lang="ts">
import { ref } from 'vue';
import ColorThemeForm from '@/components/forms/ColorThemeForm.vue';
import FontThemeForm from '@/components/forms/FontThemeForm.vue';
import { user, auth_status } from '@/context';
import ChangePasswordForm from '@/components/forms/ChangePasswordForm.vue';

const current_setting = ref('')

function select_form(v: string) {
  current_setting.value = v
}


</script>

<template>
  <div class="settings-wrapper">
    <div :class="current_setting ? 'hide settings' : 'settings'">
      <h1>Settings</h1>

      <div>
        <button @click="select_form('color')">Color theme</button>
        <button @click="select_form('font')">Font theme</button>
        <button @click="select_form('password')">Change password</button>
        <button @click="auth_status.logout">Logout</button>
      </div>
    </div>

    <div :class="current_setting ? 'current-setting' : 'hide'">
      <button @click="select_form('')">Settings</button>
      <ColorThemeForm v-if="current_setting === 'color'" :current_theme="user.theme" :key="user.theme" />

      <FontThemeForm v-if="current_setting === 'font'" :current_font="user.font" :key="user.font" />

      <ChangePasswordForm v-if="current_setting === 'password'" />

    </div>
  </div>
</template>

<style scoped>
.hide {
  display: none;
}

.settings-wrapper {
  padding: 24px 16px;

  h1 {
    margin-bottom: 16px;
  }
}

.settings {
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
      text-align: left;
      padding: 17px 0;
      font-size: 14px;
      font-weight: 500;

      &:nth-of-type(3) {
        border-bottom: 1px solid var(--borderColor);
      }
    }

  }


}
</style>
