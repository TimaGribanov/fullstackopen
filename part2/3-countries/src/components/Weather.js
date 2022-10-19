const Weather = props => {
    if (props.weather.length !== 0) {
        const imgSrc = `http://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`
    return <div>
        <h3>Weather in {props.weather.name}</h3>
        <p>Temperature: {props.weather.main.temp}°C</p>
        <p><img src={imgSrc} alt={props.weather.name} /></p>
        <p>wind {props.weather.wind.speed} m/s</p>
    </div>
    }
    
    return <div></div>
}

export default Weather