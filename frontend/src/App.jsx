import React, { useState } from 'react'

import Note from './components/Notes'
import './App.css'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'A new note...'
  )
  const [showAll, setShowAll] = useState(true)
  
	const notesToShow = showAll
	  ? notes
	  : notes.filter(note => note.important)
  
  // Event handler of the form
  const addNote = (event) => {
	  event.preventDefault()
	  const noteObject = {
	    content: newNote,
	    important: Math.random() < 0.5,
	    id: notes.length + 1,
	  }
	  setNotes(notes.concat(noteObject))
	  setNewNote('')
	}
  
  // Event handler of the input box
  const handleNoteChange = (event) => {
    console.log(event.target.value)  // the target is <input>
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
