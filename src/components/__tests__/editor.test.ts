// props, user input, saving/creating note
import { describe, test, expect, vi } from "vitest";
import { mount } from '@vue/test-utils'
import NoteEditor from "../NoteEditor.vue";

// mock fetch
const mockFetch = vi.fn()
mockFetch.mockReturnValue(Promise.resolve({
  status: 200,
  json: () => Promise.resolve({ "details": "note archived" })
})
)

vi.stubGlobal('fetch', mockFetch)

// props -> title, text, tags
// note - title, tags, content, date

describe('test note editor component', () => {
  test('initial rendering', () => {
    const wrapper = mount(NoteEditor, {
      props: {
        title: 'Test note',
        tags: ['test tag1', 'test tag2'],
        note_text: 'Test note content'
      }
    })

    expect(wrapper.find<HTMLInputElement>('[data-test=note-title]').element.value).toMatch('Test note')
    expect(wrapper.find<HTMLInputElement>('[data-test=note-tags]').element.value).toMatch('test tag1, test tag2')
    expect(wrapper.find<HTMLInputElement>('[data-test=note-content]').element.value).toMatch('Test note content')
    expect(wrapper.find<HTMLInputElement>('[data-test=note-date]').element.textContent).toMatch('Not saved yet')

  })

  test('updating input values', async () => {
    const wrapper = mount(NoteEditor, {
      props: {
        title: 'Test note',
        tags: ['test tag1', 'test tag2'],
        note_text: 'Test note content'
      }
    })

    const title_input = wrapper.find<HTMLInputElement>('[data-test=note-title]')
    const tags_input = wrapper.find<HTMLInputElement>('[data-test=note-tags]')
    const content_input = wrapper.find<HTMLInputElement>('[data-test=note-content]')

    await title_input.setValue('updated test title')
    await tags_input.setValue('tag3, tag4')
    await content_input.setValue('updated test note content')

    expect(title_input.element.value).toMatch('updated test title')
    expect(tags_input.element.value).toMatch('tag3, tag4')
    expect(content_input.element.value).toMatch('updated test note content')

  })
})

