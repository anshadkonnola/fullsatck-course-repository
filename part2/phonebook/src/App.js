import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
      .catch(error => 
        console.error(error)
      )
  }
  useEffect(hook, []);

  const addNewName = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)) {
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

  const personsToShow = persons.filter(person => {
    if(filter === "") return true
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={(event) => setFilter(event.target.value)}/>
      <h2>add a new</h2>
      <PersonForm name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} addName={addNewName}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  );
}

export default App;
