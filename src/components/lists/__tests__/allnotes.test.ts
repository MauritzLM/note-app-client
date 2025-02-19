import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils'
import AllNotes from "../AllNotes.vue";

const mock_notes = [
  { id: '1', title: 'One', text: 'Hi', isArchived: false, tags: ['tag1', 'tag2'], date: '' },
  { id: '2', title: 'two', text: 'Hi', isArchived: false, tags: ['tag1', 'tag5'], date: '' },
  { id: '3', title: 'three', text: 'bye', isArchived: true, tags: ['tag1', 'tag3'], date: '' },
  { id: '4', title: 'four', text: 'yo', isArchived: true, tags: ['tag3', 'tag4'], date: '' },
]

describe('test all notes component', () => {
  test('renders list of all notes', () => {
    const wrapper = mount(AllNotes, {
      props: {
        notes: mock_notes
      }
    });

    expect(wrapper.findAll('[data-test=note]')).toHaveLength(4)

  });

  test('renders correct info of note', () => {
    const wrapper = mount(AllNotes, {
      props: {
        notes: mock_notes
      }
    });

    const all_titles = wrapper.findAll('[data-test=title]')

    expect(all_titles[0].text()).toMatch('One')
    // test tags*
    // test date*

  });
});