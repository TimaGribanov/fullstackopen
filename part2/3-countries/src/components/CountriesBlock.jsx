import CountryFull from './CountryFull'
import Country from './Country'

const CountriesBlock = ({ countries, openFull, getWeather, weather, visibility }) => {
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
            weather={weather}
        />

    return (
        <div>
            {countries.map(country => {
                let display = 'none'
                visibility.forEach(v => { if (country.id === v.id && v.visible) display = 'block' })
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
                        getWeather={getWeather}
                        weather={weather}
                        visibility={{ display }}
                    />
                )
            }

            )}
        </div>
    )
}

export default CountriesBlock