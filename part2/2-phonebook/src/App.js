import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise done')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPersons = (event) => {
    event.preventDefault()
    if (persons.find(e => e.name === newName) !== undefined) {
      alert(`Person ${newName} already exists!`)
    } else {
      const newPerson = {
        id: persons[persons.length - 1].id + 1,
        name: newName,
        number: newNumber,
        visible: true
      }
      setPersons(persons.concat(newPerson))
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

  return (
    <div>
      <h2>Phonebook</h2>
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
          name={person.name}
          number={person.number}
          visible={person.visible}
        />
      )}
    </div>
  )
}

export default App
