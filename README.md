# Frontend Mentor - Note Taking App

This is a project for [frontend mentor](https://www.frontendmentor.io/). It is a simple note taking app with authentication, crud and search functionality.
The backend was built using [fastapi](https://fastapi.tiangolo.com/).
The project was created using the vue@latest npm cmd.
Hosted on [Vercel](https://vercel.com/).

Tools used:
- [Vite](https://vite.dev/)
- [Vuejs](https://vuejs.org/) with Typescript
- Vue Router

## Notes
- First time using vuejs, always used react. It is like people say better dev experience. Easier to manage state / component complexity
- If you want initialize an empty array or object inside your app context or reactive state (used as context) cast it to the correct type.

```ts
// note object in types.ts
export interface noteObj {
  id: string,
  title: string,
  text: string,
  isArchived: boolean,
  tags: string[]
  date: string
}

// context object
export const all_notes: notesState = reactive({
  notes: [] as noteObj[],
  ...
})
```
- You can use $route.name to get current route name (the name used in create router setup)
- Things to add: password reset, authentication using google account


## App structure

### Auth
 - The auth component displays either the signup or login form depending on state

### Lists
- All notes: a list of all user notes
- Archived notes: a list of all archived notes
- Tags: a list of all tags used for notes
- Search list: a list of all notes who's title and tags matches the search term 

### Editor
The note editor is just an html textarea 

### Settings
The settings view contains the following:

- Color theme: light, dark or system(default)
- Font theme: serif, sans-serif(default) or monospace
- Change password
- Logout

## Helpful links
