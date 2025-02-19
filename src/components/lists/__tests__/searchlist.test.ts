import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils'
import SearchList from "../SearchList.vue";

const mock_notes = [
  { id: '1', title: 'One', text: 'Hi', isArchived: false, tags: ['tag1', 'tag2'], date: '' },
  { id: '2', title: 'two', text: 'Hi', isArchived: false, tags: ['tag1', 'tag5'], date: '' },
  { id: '3', title: 'three', text: 'bye', isArchived: true, tags: ['tag1', 'tag3'], date: '' },
  { id: '4', title: 'four', text: 'yo', isArchived: true, tags: ['tag3', 'tag4'], date: '' },
]

describe('test search list component', () => {
  test('search by name', async () => {
    const wrapper = mount(SearchList, {
      props: {
        notes: mock_notes
      }
    });

    // find input element and set value
    const input = wrapper.find('[data-test=search]')

    await input.setValue('two')

    const note_titles = wrapper.findAll('[data-test=title]')
    expect(note_titles).toHaveLength(1)
    expect(note_titles[0].text()).toMatch('two')

  });

  test('search by tag', async () => {
    const wrapper = mount(SearchList, {
      props: {
        notes: mock_notes
      }
    });

    const input = wrapper.find('[data-test=search]')

    await input.setValue('tag3')

    const note_titles = wrapper.findAll('[data-test=title]')
    expect(note_titles).toHaveLength(2)
    expect(note_titles[0].text()).toMatch('three')
    expect(note_titles[1].text()).toMatch('four')
  });

  test('empty search', async () => {
    const wrapper = mount(SearchList, {
      props: {
        notes: mock_notes
      }
    });

    const input = wrapper.find('[data-test=search]')

    await input.setValue('really long search term')

    const notes = wrapper.findAll('[data-test=note]')
    expect(notes).toHaveLength(0)
    expect(wrapper.find('[data-test=empty]').isVisible()).toBe(true)
  });
});