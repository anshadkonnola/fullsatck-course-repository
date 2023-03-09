const PersonForm = ({name, setName, number, setNumber, addName}) => {
    return (
        <form>
            <div>
            name: <input value={name} onChange={(event) => setName(event.target.value)}/>
            </div>
            <div>
            number: <input value={number} onChange={(event) => setNumber(event.target.value)}/>
            </div>
            <div>
            <button type="submit" onClick={addName}>add</button>
            </div>
      </form>
    )
}

export default PersonForm