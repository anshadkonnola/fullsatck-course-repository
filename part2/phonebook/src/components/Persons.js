const Persons = ({persons, removePerson}) => {
    return (
    <ul>
    {persons.map(person => (
        <>
        <li key={person.id}>{person.name}: {person.number}</li>
        <button onClick={() => removePerson(person.id)}>delete</button>
        </>
    ))}
    </ul>
    )
}


export default Persons