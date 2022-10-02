import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountriesBlock from './components/CountriesBlock'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //setCountries(response.data)
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
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <CountriesBlock countries={showCountries} />
    </div>
  );
}

export default App;
