import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => console.log(error))
  }, []);

  const addNewName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const checkPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if(checkPerson) {
      if(checkPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      } else if(window.confirm(`Are you sure you want update ${checkPerson.name}'s number with a new one?`)) {
        personService
          .update(checkPerson.id, {...checkPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== checkPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error)
            alert(`The person '${checkPerson.name}' was already removed from server`)
            setPersons(persons.filter(person => person.id !== checkPerson.id))
          })
        return
      }
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    if(window.confirm(`Are you sure you want to delete this person?`)){
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }

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
      <Persons persons={personsToShow} removePerson={deletePerson} />
    </div>
  );
}

export default App;
