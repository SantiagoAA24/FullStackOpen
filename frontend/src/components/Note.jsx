const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="d-flex justify-content-between">
      {note.content}
      <button className="btn btn-secondary" onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note