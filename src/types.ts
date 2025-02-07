
// note object
export interface noteObj {
  id: string,
  title: string,
  text: string,
  isArchived: boolean,
  tags: string[]
}

export interface notesState {
  notes: noteObj[],
  updateNotes: (arr: noteObj[]) => void
}
