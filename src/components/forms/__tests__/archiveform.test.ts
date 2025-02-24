
import { describe, test, expect, vi } from "vitest";
import { mount } from '@vue/test-utils'
import ArchiveForm from "../ArchiveForm.vue";

// mock fetch
const mockFetch = vi.fn()
mockFetch.mockReturnValue(Promise.resolve({
  status: 200,
  json: () => Promise.resolve({ "details": "note archived" })
})
)

vi.stubGlobal('fetch', mockFetch)

// close modal, submit
describe('archive form test', () => {
  test('initial rendering', () => {
    const wrapper = mount(ArchiveForm, {
      props: {
        showModal: vi.fn()
      }
    });

    expect(wrapper.find('[data-test=form]').exists()).toBe(true)
  });

  test('clicking cancel button calls showModal function', async () => {
    const wrapper = mount(ArchiveForm, {
      props: {
        showModal: vi.fn()
      }
    });

    const cancel_btn = wrapper.find('[data-test=cancel]')

    await cancel_btn.trigger('click')

    // showmodal has been called
    expect(wrapper.props().showModal).toHaveBeenCalled()

  })

  test('submit form', async () => {
    const wrapper = mount(ArchiveForm, {
      props: {
        showModal: vi.fn()
      }
    });

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted()).toHaveProperty('submit')
  })
});