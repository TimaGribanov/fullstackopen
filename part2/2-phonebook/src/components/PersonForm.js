const PersonForm = ({ addPersons, newName, handlePersons, newNumber, handleNumbers }) => {
    return (
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
    )
}

export default PersonForm