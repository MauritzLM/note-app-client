<script setup lang="ts">
import { ref } from 'vue';
import ColorThemeForm from '@/components/forms/ColorThemeForm.vue';
import FontThemeForm from '@/components/forms/FontThemeForm.vue';
import { user, auth_status, toast_message } from '@/context';
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
        <button data-test="option" @click="select_form('color')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12.055 3v1.372m0 15.256V21m9-9h-1.372M4.427 12H3.055m15.364-6.364-.97.97M6.66 17.394l-.97.97m12.728 0-.97-.97M6.66 6.606l-.97-.97" />
            <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12.055 7.805a4.195 4.195 0 1 1 0 8.39 4.195 4.195 0 0 1 0-8.39Z" clip-rule="evenodd" />
          </svg>
          <span>Color theme</span>
        </button>
        <button data-test="option" @click="select_form('font')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path fill="#0E121B" fill-rule="evenodd"
              d="M20.999 10.979H14.63a1 1 0 0 0-1 1v1.13a1 1 0 1 0 2 0v-.13h1.154v4.409h-.39a1 1 0 1 0 0 2h2.84a1 1 0 1 0 0-2h-.45v-4.41h1.214v.13a1 1 0 1 0 2 0v-1.13a1 1 0 0 0-1-1Z"
              clip-rule="evenodd" />
            <path fill="#0E121B" fill-rule="evenodd"
              d="M12.185 17.388H10.29V6.61h4.415v1.25a1 1 0 0 0 2 0V5.61a1 1 0 0 0-1-1H2.999a1 1 0 0 0-1 1v2.25a1 1 0 0 0 2 0V6.61H8.29v10.78H6.517a1 1 0 1 0 0 2h5.668a1 1 0 1 0 0-2Z"
              clip-rule="evenodd" />
          </svg>
          <span>Font theme</span>
        </button>
        <button data-test="option" @click="select_form('password')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M16.424 9.448V7.3a4.552 4.552 0 0 0-4.551-4.551 4.55 4.55 0 0 0-4.57 4.53v2.168" />
            <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M15.683 21.25H8.042a3.792 3.792 0 0 1-3.792-3.792v-4.29a3.792 3.792 0 0 1 3.792-3.791h7.641a3.792 3.792 0 0 1 3.792 3.792v4.289a3.792 3.792 0 0 1-3.792 3.792Z"
              clip-rule="evenodd" />
            <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M11.862 14.203v2.22" />
          </svg>
          <span>Change password</span>
        </button>
        <button data-test="option" @click="auth_status.logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M21 11.998H8.945m12.055 0-2.932-2.934M21 11.998l-2.932 2.936M14.556 8.266V7.251c0-1.56-1.121-2.891-2.651-3.15L6.702 3.046C4.765 2.718 3 4.219 3 6.195v11.61c0 1.976 1.765 3.477 3.702 3.15l5.203-1.057a3.188 3.188 0 0 0 2.65-3.149v-1.014" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>

    <div data-test="current-setting" :class="current_setting ? 'current-setting' : 'hide'">
      <button class="back-btn" @click="select_form('')"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          fill="none" viewBox="0 0 24 24">
          <path fill="#000" fill-rule="evenodd" d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
            clip-rule="evenodd" />
        </svg>
        <span>Settings</span>
      </button>

      <ColorThemeForm data-test="form" v-if="current_setting === 'color'" :current_theme="user.theme"
        :key="user.theme" />

      <FontThemeForm v-if="current_setting === 'font'" :current_font="user.font" :key="user.font" />

      <ChangePasswordForm v-if="current_setting === 'password'" />

    </div>

    <!-- toast -->
    <div v-if="toast_message.showToast" class="toast">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path fill="#0E121B" fill-rule="evenodd"
            d="m15.993 10.222-4.618 4.618a.746.746 0 0 1-1.061 0l-2.309-2.309a.75.75 0 0 1 1.06-1.061l1.78 1.779 4.087-4.088a.75.75 0 1 1 1.061 1.061ZM12 2.5c-5.238 0-9.5 4.262-9.5 9.5 0 5.239 4.262 9.5 9.5 9.5s9.5-4.261 9.5-9.5c0-5.238-4.262-9.5-9.5-9.5Z"
            clip-rule="evenodd" />
        </svg>
        <span>{{ toast_message.currentMsg }}</span>
        <button @click="toast_message.displayToast(false)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path class="stroke" stroke="#0E121B" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
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
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--descriptionTextColor);

      svg {
        path {
          stroke: var(--textColorMain);
        }
      }

      &:nth-of-type(3) {
        border-bottom: 1px solid var(--borderColor);
      }

      &:nth-of-type(2) {
        svg {
          path {
            stroke: transparent;
            fill: var(--textColorMain);
          }
        }
      }
    }
  }
}

.current-setting {
  .back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.toast {
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--borderColor);
  border-radius: 10px;
  position: absolute;
  bottom: 70px;
  right: 20px;
  min-width: 270px;
  font-size: 14px;
  background-color: var(--bodyBackgroundColor);

  svg {
    path {
      fill: var(--green-500)
    }
  }


  button {
    justify-self: end;
    display: flex;
    justify-content: center;
    align-items: center;

    .stroke {
      stroke: var(--neutral-400);
    }
  }
}

.back-btn {
    display: flex;
    align-items: center;
    color: var(--textColorAlt2);
    gap: 6px;
    font-size: 14px;

    svg {
      path {
        fill: var(--textColorAlt2);
        stroke: none;
      }

    }
  }
</style>
