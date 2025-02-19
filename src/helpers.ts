import { type noteObj } from "./types";

// get all tags
export function get_all_tags(notesArr: noteObj[]): string[] {

  const tags_list: string[] = []

  if (!notesArr.length) {
    return []
  }
  // get all unique tags
  notesArr.forEach(n => {
    n.tags.forEach(tag => {
      if (!tags_list.includes(tag))
        tags_list.push(tag)
    })
  });

  return tags_list
}

// search function
export function search_notes(searchTerm: string, notesArr: noteObj[]): noteObj[] | [] {
  const sortedList: noteObj[] = []

  if (!notesArr.length) {
    return []
  }

  for (let i = 0; i < notesArr.length; i++) {
    let count = 0
    let found = false
    // check that note is not already in list
    for (let j = 0; j < sortedList.length; j++) {
      if (notesArr[i].id === sortedList[j].id) {
        count++
        break
      }
    }

    // compare search term to title
    if (notesArr[i].title && notesArr[i].title.toLowerCase().includes(searchTerm)) {
      found = true
    }

    // search tags
    for (let k = 0; k < notesArr[i].tags.length; k++) {
      if (notesArr[i].tags[k] && notesArr[i].tags[k].toLowerCase().includes(searchTerm)) {
        found = true
      }
    }

    // not in sorted list and found match with title or tag
    if (count === 0 && found) {
      sortedList.push(notesArr[i])
    }

  }

  return sortedList
}

// list by tag* -> note.tags includes selected tag
