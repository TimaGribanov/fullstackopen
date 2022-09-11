import { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: '040-1234567', visible: true },
    { id: 1, name: 'Ada Lovelace', number: '39-44-5323523', visible: true },
    { id: 2, name: 'Dan Abramov', number: '12-43-234345', visible: true },
    { id: 3, name: 'Mary Poppendieck', number: '39-23-6423122', visible: true }
  ])
  const [personsId, setPersonsId] = useState(persons[persons.length - 1].id + 1)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPersons = (event) => {
    event.preventDefault()
    if (persons.find(e => e.name === newName) !== undefined) {
      alert(`Person ${newName} already exists!`)
    } else {
      setPersonsId(personsId + 1)
      const newPerson = {
        id: personsId,
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
