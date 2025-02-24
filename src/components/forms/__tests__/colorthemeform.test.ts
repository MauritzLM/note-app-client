
import { describe, test, expect, vi } from "vitest";
import { mount } from '@vue/test-utils'
import ColorThemeForm from "../ColorThemeForm.vue";

// mock fetch
const mockFetch = vi.fn()
mockFetch.mockReturnValue(Promise.resolve({
  status: 200,
  json: () => Promise.resolve({ "details": "color theme updated" })
})
);

vi.stubGlobal('fetch', mockFetch)

describe('test font theme form', () => {
  test('initial rendering', async () => {
    const wrapper = mount(ColorThemeForm, {
      props: {
        current_theme: 'light'
      }
    });

    const radio_inputs = await wrapper.findAll<HTMLInputElement>('input[type="radio"]')

    expect(wrapper.find('[data-test=form]').exists()).toBe(true)
    expect(radio_inputs.length).toBe(3)
    // initial selected value
    expect(radio_inputs[0].element.checked).toBe(true)
  });

  test('select different option', async () => {
      const wrapper = mount(ColorThemeForm, {
        props: {
          current_theme: 'light'
        }
      });
  
      const radio_inputs = wrapper.findAll<HTMLInputElement>('input[type="radio"]')
  
      await radio_inputs[2].trigger('click')
  
      expect(radio_inputs[2].element.checked).toBe(true)
    })

  test('submit form', async () => {
    const wrapper = mount(ColorThemeForm, {
      props: {
        current_theme: 'light'
      }
    });
  
      await wrapper.find('form').trigger('submit.prevent')
  
      expect(wrapper.emitted()).toHaveProperty('submit')
    })
});