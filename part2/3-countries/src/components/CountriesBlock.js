import Country from "./Country"
import CountryFull from "./CountryFull"

const CountriesBlock = ({ countries }) => {
    if (countries.length > 10)
        return <div><p>Too many matches, specify another filter</p></div>
    
    if (countries.length === 1)
        return <CountryFull
                    key={countries[0].id}
                    name={countries[0].name.common}
                    capital={countries[0].capital}
                    area={countries[0].area}
                    languages={countries[0].languages}
                    flag={countries[0].flags.svg}
                />
    
    return (
        <div>
            {countries.map(country =>
                <Country
                    key={country.id}      
                    name={country.name.common}
                />
            )}
        </div>
    )
}

export default CountriesBlock