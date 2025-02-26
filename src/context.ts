import { reactive } from "vue";
import { type notesState, type noteObj, type userObj, type updateObj } from "./types";

// user 
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
  },
  updateTheme(t: string) {
    this.theme = t
  },
  updateFont(f: string) {
    this.font = f
  },
  updateUser(u: updateObj) {
    this.username = u.username
    this.theme = u.theme
    this.font = u.font
    this.token = u.token
  }
});

// auth status
export const auth_status = reactive({
  authenticated: false,
  login() {
    this.authenticated = true
  },
  logout() {
    this.authenticated = false
    localStorage.clear()
  }
});

// all notes
export const all_notes: notesState = reactive({
  notes: [{}] as noteObj[],
  updateNotes(arr: noteObj[]) {
    this.notes = [...arr]
  }
});

// selected note
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
});

// toasts
export const toast_message = reactive({
  currentMsg: '',
  showToast: false,
  displayToast(b: boolean) {
    this.showToast = b
  },
  changeMessage(m: string) {
    this.currentMsg = m
  }

});