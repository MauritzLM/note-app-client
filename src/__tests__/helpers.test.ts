import { test, describe, expect } from 'vitest'
import { search_notes, get_all_tags } from '@/helpers'
import type { noteObj } from '@/types'

const test_array: noteObj[] = [
  { id: '1', title: 'One', text: 'Hi', isArchived: false, tags: ['tag1', 'tag2'], date: '' },
  { id: '2', title: 'two', text: 'Hi', isArchived: false, tags: ['tag1', 'tag5'], date: '' },
  { id: '3', title: 'three', text: 'bye', isArchived: true, tags: ['tag1', 'tag3'], date: '' },
  { id: '4', title: 'four', text: 'yo', isArchived: true, tags: ['tag3', 'tag4'], date: '' },
];


describe('test helper functions', () => {
  test('get all tags function', () => {
    expect(get_all_tags(test_array).toString()).toEqual('tag1,tag2,tag5,tag3,tag4')
    expect(get_all_tags([])).toEqual([])
  });

  test('search function', () => {

    expect(search_notes('tag1', test_array).length).toBe(3)
    expect(search_notes('tag2', test_array).length).toBe(1)
    expect(search_notes('tag3', test_array).length).toBe(2)
    expect(search_notes('one', test_array).length).toBe(1)
    expect(search_notes('', test_array).length).toBe(4)
    expect(search_notes('', []).length).toBe(0)
  });
});