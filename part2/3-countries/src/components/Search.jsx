const Search = ({ handleSearch }) => {
    return (
        <form>
            <div>
                find countries <input onChange={handleSearch} />
            </div>
        </form>
    )
}

export default Search