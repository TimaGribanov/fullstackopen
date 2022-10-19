import CountryFull from "./CountryFull"

const Country = ({ name, id, capital, area, languages, flag, openFull, getWeather, weather, visibility }) => {
    const handleClick = () => {
        openFull(id)
        getWeather(capital)
    }
    return <div>
        <span>{name}</span>
        <button onClick={handleClick}>show</button>  
        <CountryFull 
            key={id}
            name={name}
            capital={capital}
            area={area}
            languages={languages}
            flag={flag}
            weather={weather}
            visibility={visibility}
        />
    </div>
}

export default Country