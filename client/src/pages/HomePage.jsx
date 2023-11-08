import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  const { user, authTokens } = useContext(AuthContext)
  let [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async () => {
    const response = await fetch('http://localhost:3000/api/notes/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })

    const data = await response.json()
    setNotes(data)
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <div>
        <p>You are logged to the home page!</p>

        <ul>
          {notes.map(note => (
            <li key={note.id} >{note.title}</li>
          ))}
        </ul>
      </div>
    )
  }

}

export default HomePage