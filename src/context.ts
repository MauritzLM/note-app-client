import { reactive } from "vue";
import { type notesState, type noteObj, type userObj } from "./types";

export const user = reactive({
  username: '',
  theme: '',
  font: '',
  token: '',
  setUser(user: userObj) {
   this.username = user.details.username
   this.theme = user.details.theme
   this.font = user.details.font
   this.token = user.token.access_token
  }
})

export const auth_status = reactive({
  authenticated: false,
  login() {
    this.authenticated = true
  },
  logout() {
    this.authenticated = false
  }
})

export const all_notes: notesState = reactive({
  notes: [{}],
  updateNotes(arr: noteObj[]) {
     this.notes = [...arr] 
  }
})

export const selected_note = reactive({
  note: { id: '1', title: '', text: '', isArchived: false, tags: [''], date: '' },
  displayEditor: false,
  isNew: false,
  changeSelected(obj: noteObj) {
    this.note = obj
    this.displayEditor = true
    this.isNew = false
  },
  changeDisplay(b: boolean) {
    this.displayEditor = b
  },
  newNote() {
    this.displayEditor = true
    this.note = { id: '', title: '', text: '', isArchived: false, tags: [''], date: '' }
    this.isNew = true
  }
})