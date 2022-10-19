import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountriesBlock from './components/CountriesBlock'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])
  const [fullViewVisibile, setFullViewVisible] = useState([])
  const [weather, setWeather] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        let id = 0
        setCountries(response.data.map(c => {
          ++id
          return { ...c, id: id }
        }))
      })
  }

  useEffect(hook, [])

  const handleSearch = event => {
    let tempCountries = []

    countries.forEach(c => {
      if (c.name.common.toLowerCase().includes(event.target.value) && event.target.value.length !== 0) {
        tempCountries.push(c)
      }
    })

    setShowCountries(tempCountries)

    setFullViewVisible(tempCountries.map(c => {
      const id = c.id
      return { id, visible: false }
    }))
  }

  const getWeather = capital => {
    const apiKey = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
      .then(response => setWeather(response.data))
  }

  const openFull = inputId => {
    const id = inputId

    setFullViewVisible(fullViewVisibile.map(e => {
      if (e.id === id) {
        if (e.visible) return { ...e, visible: false }

        return { ...e, visible: true }
      }

      return { ...e, visible: false }
    }))
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <CountriesBlock
        countries={showCountries}
        openFull={openFull}
        getWeather={getWeather}
        weather={weather}
        visibility={fullViewVisibile}
      />
    </div>
  );
}

export default App;
