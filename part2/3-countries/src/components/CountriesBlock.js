import Country from "./Country"
import CountryFull from "./CountryFull"

const CountriesBlock = ({ countries, openFull, visibility }) => {
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
            {countries.map(country => {
                let display = 'none'
                visibility.forEach(v => {if (country.id === v.id && v.visible) display = 'block'})
                return (
                    <Country
                key={country.id}
                id={country.id}    
                name={country.name.common}
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                flag={country.flags.svg}
                openFull={openFull}
                visibility={{display}}
            />
            )
                }
                
            )}
        </div>
    )
}

export default CountriesBlock