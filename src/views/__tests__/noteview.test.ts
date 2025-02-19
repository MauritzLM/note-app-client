import { describe, test, expect, vi } from "vitest";
import { mount } from '@vue/test-utils'
import NoteView from '../NoteView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const mockFetch = vi.fn()
mockFetch.mockReturnValue(Promise.resolve({
  status: 200,
  json: () => Promise.resolve(mock_notes)
})
)

// all notes context
const mock_notes = [
  { id: '1', title: 'One', text: 'Hi', isArchived: false, tags: ['tag1', 'tag2'], date: '' },
  { id: '2', title: 'two', text: 'Hi', isArchived: false, tags: ['tag1', 'tag5'], date: '' },
  { id: '3', title: 'three', text: 'bye', isArchived: true, tags: ['tag1', 'tag3'], date: '' },
  { id: '4', title: 'four', text: 'yo', isArchived: true, tags: ['tag3', 'tag4'], date: '' },
]

vi.stubGlobal('fetch', mockFetch)

describe('test note view component', () => {
  test('initial redering', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{
        path: '/all/all',
        name: 'All Notes',
        component: NoteView
      }]
    })

    router.push('/all/all')

    const wrapper = mount(NoteView, {
      global: {
        plugins: [router],
      }
    })
    
    expect(wrapper.findComponent(NoteView).exists()).toBe(true)
    expect(wrapper.get('[data-test=current-list]').isVisible()).toBe(true)
  })
})