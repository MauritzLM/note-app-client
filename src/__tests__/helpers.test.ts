import { test, describe, expect } from 'vitest'
import { search_notes } from '@/helpers'
import type { noteObj } from '@/types'

const test_array: noteObj[] = [
  {id: '1', title: 'One', text: 'Hi', isArchived: false, tags: ['tag1', 'tag2']},
  {id: '2', title: 'two', text: 'Hi', isArchived: false, tags: ['tag1', 'tag5']},
  {id: '3', title: 'three', text: 'bye', isArchived: true, tags: ['tag1', 'tag3']},
  {id: '4', title: 'four', text: 'yo', isArchived: true, tags: ['tag3', 'tag4']},

]


describe('test helper functions', () => {
  test('search function', () => {
    // test empty search term and no array*
       expect(search_notes('tag1', test_array).length).toBe(3)
       expect(search_notes('tag2', test_array).length).toBe(1)
       expect(search_notes('tag3', test_array).length).toBe(2)
       expect(search_notes('one', test_array).length).toBe(1)
  })
})