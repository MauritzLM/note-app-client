
import { describe, test, expect, vi } from "vitest";
import { mount } from '@vue/test-utils'
import ChangePasswordForm from "../ChangePasswordForm.vue";

// mock fetch
const mockFetch = vi.fn()
mockFetch.mockReturnValue(Promise.resolve({
  status: 200,
  json: () => Promise.resolve({ "details": "password updated" })
})
)

vi.stubGlobal('fetch', mockFetch)

describe('test changepassword form', () => {
  test('initial rendering', () => {
    const wrapper = mount(ChangePasswordForm)

    expect(wrapper.find('[data-test=form]').exists()).toBe(true)
  })

  test('input values', async () => {
    const wrapper = mount(ChangePasswordForm)

    const old_input = wrapper.find<HTMLInputElement>('[data-test=old]')
    const new_input = wrapper.find<HTMLInputElement>('[data-test=new]')
    const confirm_input = wrapper.find<HTMLInputElement>('[data-test=confirm]')

    await old_input.setValue('old password')
    await new_input.setValue('new password')
    await confirm_input.setValue('confirm password')

    expect(old_input.element.value).toBe('old password')
    expect(new_input.element.value).toBe('new password')
    expect(confirm_input.element.value).toBe('confirm password')
  })

  test('form submission', async () => {
    const wrapper = mount(ChangePasswordForm)

    await wrapper.find('form').trigger('submit.prevent')
  
    expect(wrapper.emitted()).toHaveProperty('submit')
  })
})
