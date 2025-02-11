
// note object
export interface noteObj {
  id: string,
  title: string,
  text: string,
  isArchived: boolean,
  tags: string[]
  date: string
}

export interface notesState {
  notes: noteObj[],
  updateNotes: (arr: noteObj[]) => void
}

export interface userObj {
  details: { username: string, font: string, theme: string },
  token: { access_token: string, token_type: string }
}
