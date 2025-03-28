import React, { useState, useEffect } from 'react'

import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // Fetch the notes from the server
  const hook = () => {
	  noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
	}
	
  useEffect(hook, [])  // this is executed immediately after rendering
	console.log('render', notes.length, 'notes')

  // Filter the notes to show
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  // Toggle the importance of the note
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
  }
  
  // Event handler of the form
  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  
  // Event handler of the input box
  const handleNoteChange = (event) => {
    console.log(event.target.value)  // the target is <input>
    setNewNote(event.target.value)
  }

  return (
    <div className='container'>
      <h1 className='my-3'>Notes</h1>
      <div className='mb-5'>
        <button className='btn btn-primary' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul className='list-group d-flex flex-column gap-2 my-3'>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          className='form-control my-3'
          value={newNote}
          onChange={handleNoteChange}
        />
        <button className='btn btn-primary' type="submit">save</button>
      </form>
    </div>
  )
}

export default App
