const Filter = ({ handleSearch }) => {
    return (
        <form>
            <div>
                filter numbers by <input onChange={handleSearch} />
            </div>
        </form>
    )
}

export default Filter