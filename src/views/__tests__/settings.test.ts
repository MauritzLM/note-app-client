import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils'
import SettingsView from "../SettingsView.vue";


describe('test settings component', () => {


  test('initial rendering', () => {
    const wrapper = mount(SettingsView)

    const setting_options = wrapper.findAll('[data-test=option]')

    expect(setting_options).toHaveLength(4)
    // display: none on current-setting*
    // expect(wrapper.find('[data-test=current-setting]').isVisible()).toBe(false)
  });

  test('user selects a setting option', async () => {
    const wrapper = mount(SettingsView)

    const setting_options = wrapper.findAll('[data-test=option]')

    // click color theme button and assert form is visible
    await setting_options[0].trigger('click')

    expect(wrapper.find('[data-test=form]').isVisible()).toBe(true)

  });
});