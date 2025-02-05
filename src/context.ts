import { reactive } from "vue";
import { type notesState, type noteObj } from "./types";

export const user = reactive({
  username: '',
  theme: '',
  font: '',
  token: '',
  setFont(f: string) {
    this.font = f
  },
  setTheme(th: string){
      this.theme = th
  },
  setToken(t: string) {
    this.token = t
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