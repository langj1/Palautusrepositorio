import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, handleDelete}) => {
  return (<p>{person.name} {person.number} <button onClick={handleDelete} value={person.id}>delete</button></p>)
}

const Filter = (props) => {

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    props.setFilter(event.target.value)
  }
  return (
    <div>
      filter shown with <input value={props.filter} onChange={handleFilterChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
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

    personService
      .create(personObject)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(JSON.stringify(error.response.data))
        console.log(error.response.data)
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleDelete = (event) => {

    console.log(event.target.value)
    const person = persons.find(x => x.id == event.target.value)
    if(window.confirm('Delete '+person.name+'?'))
    personService.poista(person.id)
    personService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
      })  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
      })
  }

  useEffect(hook, [])

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
        <Person key={person.name} person={person} handleDelete={handleDelete}></Person>)}
    </div>
  )

}

export default App
