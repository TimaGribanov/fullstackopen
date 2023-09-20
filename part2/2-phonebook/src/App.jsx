import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Message from './components/Message'
import Error from './components/Error'
import api from './api.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const hook = () => {
    api
      .getAll()
      .then(initialData => setPersons(initialData))
  }

  useEffect(hook, [])

  const addPersons = (event) => {
    event.preventDefault()
    if (persons.find(e => e.name === newName) !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(({ name }) => name === newName).id
        const updatedPerson = {
          id: id,
          name: newName,
          number: newNumber,
          visible: true
        }
        api
          .update(id, updatedPerson)
          .then(() => hook())
      }
    } else {
      const newPerson = {
        id: persons[persons.length - 1].id + 1,
        name: newName,
        number: newNumber,
        visible: true
      }
      setPersons(persons.concat(newPerson))
      api
        .add(newPerson)
        .then(() => {
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
    }
  }

  const handlePersons = (event) => {
    setNewName(event.target.value)
  }

  const handleNumbers = event => setNewNumber(event.target.value)

  const handleSearch = event => {
    setPersons(
      persons.map(p => {
        if (p.name.toLowerCase().includes(event.target.value)) {
          return { ...p, visible: true }
        }
        return { ...p, visible: false }
      })
    )
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      api
        .remove(id)
        .then(res => hook())
        .catch(e => {
          setError(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setError('')
          }, 5000)
          hook()
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error error={error} />
      <Message message={message} />
      <Filter handleSearch={handleSearch} />
      <h2>Add new number</h2>
      <PersonForm
        addPersons={addPersons}
        newName={newName}
        handlePersons={handlePersons}
        newNumber={newNumber}
        handleNumbers={handleNumbers}
      />
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          visible={person.visible}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App