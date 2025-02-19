import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils'
import TagList from "../TagList.vue";

const mock_notes = [
  { id: '1', title: 'One', text: 'Hi', isArchived: false, tags: ['tag1', 'tag2'], date: '' },
  { id: '2', title: 'two', text: 'Hi', isArchived: false, tags: ['tag1', 'tag5'], date: '' },
  { id: '3', title: 'three', text: 'bye', isArchived: true, tags: ['tag1', 'tag3'], date: '' },
  { id: '4', title: 'four', text: 'yo', isArchived: true, tags: ['tag3', 'tag4'], date: '' },
]

describe('test tag list component', () => {
  test('renders a list of unique tags', () => {
    const wrapper = mount(TagList, {
      props: {
        notes: mock_notes
      }
    });

    expect(wrapper.findAll('[data-test=tag]').length).toBe(5)
    expect(wrapper.find('[data-test=back-btn]').exists()).toBe(false)
    expect(wrapper.find('[data-test=selected]').exists()).toBe(false)

  });
});