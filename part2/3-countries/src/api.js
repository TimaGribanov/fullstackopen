import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    axios
        .get(`${baseUrl}/all`)
        .then(res => res.data)
}

const getFull = name => {
    const req = axios.get(`${baseUrl}/name/${name}`)
    return req.then(res =>res.data)
}

export default { getAll, getFull }