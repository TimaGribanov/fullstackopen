const CountryFull = (props) => {
    return (
        <div style={props.visibility}>
            <h3>{props.name}</h3>
            <p>Capital: {props.capital}</p>
            <p>Area: {props.area} km<sup>2</sup></p>
            <h5>Languages:</h5>
            <ul>
                {Object.entries(props.languages).map(([key, lang]) => 
                    <li key={key}>{lang}</li>
                )}
            </ul>
            <img src={props.flag} alt={props.name} width="100px" />
        </div>
    )
}

export default CountryFull