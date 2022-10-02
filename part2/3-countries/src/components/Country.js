import CountryFull from "./CountryFull"

const Country = ({ name, id, capital, area, languages, flag, openFull, visibility }) => {
    const handleClick = () => {
        openFull(id)
    }
    return <div>
        <span>{name}</span>
        <button onClick={handleClick}>view</button>  
        <CountryFull 
            key={id}
            name={name}
            capital={capital}
            area={area}
            languages={languages}
            flag={flag}
            visibility={visibility}
        />
    </div>
}

export default Country