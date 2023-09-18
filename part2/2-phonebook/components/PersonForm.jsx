const PersonForm = ({ addName, newName, handlePersons, newNumber, handleNumber }) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handlePersons} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm