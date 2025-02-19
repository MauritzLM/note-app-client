import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils'
import SelectedTagList from "../SelectedTagList.vue";

const mock_notes = [
  { id: '1', title: 'One', text: 'Hi', isArchived: false, tags: ['tag1', 'tag2'], date: '' },
  { id: '2', title: 'two', text: 'Hi', isArchived: false, tags: ['tag1', 'tag5'], date: '' },
  { id: '3', title: 'three', text: 'bye', isArchived: true, tags: ['tag1', 'tag3'], date: '' },
  { id: '4', title: 'four', text: 'yo', isArchived: true, tags: ['tag3', 'tag4'], date: '' },
]

describe('test all notes component', () => {
  test('renders list of selected tag', () => {
    const wrapper = mount(SelectedTagList, {
      props: {
        tag: 'tag1',
        notes: mock_notes
      }
    });

    expect(wrapper.findAll('[data-test=note]')).toHaveLength(3)
    expect(wrapper.find('[data-test=heading]').text()).toMatch('Notes tagged: tag1')

  });
});