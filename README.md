# _scrpt_

## User Story

As a reader, I want:

* To view a script when provided with a url
* To filter the script by act(s), scene(s), or character(s)
* To see old versions of the script and compare them to the current version

As a writer, I want:

* To create a script that can be viewed by anyone with the  url, but can only be edited if they have the password
* To write scripts without having to worry about styling, so that I can focus on the content rather than formatting
* To simultaneously work on one document with other collaborators
* To be able to revert back to older versions of the script


## Entity Relationship Diagram

![erd](./public/erd.jpeg)

## Wireframes

![wireframes](./public/wireframe_all.jpeg)


![wireframes](./public/wireframe_1.jpeg)


![wireframes](./public/wireframe_2.jpeg)


## Frameworks and Libraries

#### Client

* React
  * React DOM
  * React Router DOM
  * React Semantic UI
  * DraftJS
* Redux
  * React-Redux
* Reactive javascript
* WebSocket
* PDFkit or jsPDF or Generatre pdf (react)

#### Server

* Ruby on Rails
* PostgreSQL
* CUID

## Store State

```javascript
state = {
  auth: {
    isLoggedIn: boolean
    name: string
  },
  script = {
    id: integer,
    cuid: string,
    title: string,
    editor: {editorState},
    versions: [
      {
        id: integer,
        editors: [
          {
            name: string
          }
        ],
        characters: [
          {
            name: string,
            description: text
          }
        ],
        acts: [
          {
            id: integer,
            title: string,
            index: float,
            scenes: [
              {
                id: integer,
                title: string,
                index: float,
                actions: [
                  {
                    id: integer,
                    type: string,
                    body: text,
                    index: float,
                    characters: [
                      {
                        id: integer,
                        name: string
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```
