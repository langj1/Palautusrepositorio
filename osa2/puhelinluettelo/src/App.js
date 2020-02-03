import React, { useState } from 'react'

const Person = ({ person }) => {
  return (<p>{person.name} {person.number}</p>)
}

const Filter = (props) => {

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    props.setFilter(event.target.value)
  }
  return(
    <div>
          filter shown with <input value={props.filter} onChange={handleFilterChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const addName = (event) => {
    event.preventDefault();
    if (persons.find(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow = filter 
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <form onSubmit={addName}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) =>
        <Person key={person.name} person={person}></Person>)}
    </div>
  )

}

export default App
