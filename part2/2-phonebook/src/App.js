import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: 'Arto Hellas',
      number: '040-1234567',
      visible: true
    },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsId, setPersonsId] = useState(1)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])

  const addPersons = (event) => {
    event.preventDefault()
    if (persons.find(e => e.name === newName) !== undefined) {
      alert(`Person ${newName} already exists!`)
    } else {
      setPersonsId(personsId + 1)
      const newPerson={
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
    let tempPersons = persons
    tempPersons.map(tempPerson => tempPerson.visible = false);
    tempPersons.forEach(e => {
      e.visible = e.name.toLowerCase().includes(event.target.value) ? true : false
    })
    console.log(tempPersons)
    let showPersons = []
    tempPersons.forEach(e => {
      if (e.visible)
        showPersons.push(e)
    })
    setPersonsToShow(showPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter numbers by <input onChange={handleSearch}/>
        </div>
      </form>
      <h2>Add new number</h2>
      <form onSubmit={addPersons}>
        <div>
          name: <input value={newName} onChange={handlePersons} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumbers} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.id} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default App
