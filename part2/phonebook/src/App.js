import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
        setNotification({
          text: `${checkPerson.name} has already added to the server.`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        return
      } else if(window.confirm(`Are you sure you want update ${checkPerson.name}'s number with a new one?`)) {
        personService
          .update(checkPerson.id, {...checkPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== checkPerson.id ? person : returnedPerson))
            setNotification({
              text: `${checkPerson.name}'s number was updated.`,
              type: 'notification'
            })
            setTimeout(() => setNotification(null), 5000) 
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setPersons(persons
              .filter(person => 
                person.name !== checkPerson.name
              )
            )
            setNotification({
              text: `${checkPerson.name} has already been deleted from the server.`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })   
        return
      }
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification({
          text: `${personObject.name} added to the phonebook.`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotification({
          text: error.response.data.error,
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    const removedPerson = persons.find(p => p.id === id)
    if(window.confirm(`Are you sure you want to delete this person?`)){
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({
            text: `${removedPerson.name} was deleted from the phonebook.`,
            type: 'notification'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
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
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={(event) => setFilter(event.target.value)}/>
      <h2>add a new</h2>
      <PersonForm name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} addName={addNewName}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={deletePerson} />
    </div>
  );
}

export default App;
