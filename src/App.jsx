import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
    const [todayWeather, setTodayWeather] = useState(null)
    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState("")
    const [data, setData] = useState(null)
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const response =await axios.get("http://localhost:3000/api",{params:{city}})
            console.log(response.data)
            setData(response.data)
            const today = response.data.first
            const rest = response.data.forecast.slice(1)
            setTodayWeather(today)
            setWeather(rest)
            console.log(today)
        }

        catch (error) {
            
        }
    }
    useEffect(()=>{
        document.getElementById("hero").style.height="50vh"
    },[weather])
  return (
    <div>
        <div className="container" id='hero'>
            <div className="hero">
                <h1>Welcome, to the weather app</h1>
                <p>Type a city's name to get its weather forecaset</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder='Enter the cities name' required/>
                    <button type='submit'>Get Weather</button>
                </form>
            </div>
        </div>
       <div className="today-weather">
            {data && (
                <h3>{data.city.name}, {data.city.country}</h3>
            )}
            {todayWeather && (
                <>
                    <h5>{todayWeather.dt_txt}</h5>
                    <h5>The Temperature rn is: {todayWeather.main.temp}°C</h5>
                    <h5>Minimum and Maximum: {todayWeather.main.temp_min}°C / {todayWeather.main.temp_max}°C</h5>
                    <h5>Today's State: {todayWeather.weather[0].description}</h5>
                </>
            )}
       </div>
        <div className="forecast">
        {weather && weather.length > 0 && (
            <>
            <h2>Upcoming Days</h2>
            <div className='forecast-container'>
            {weather.map((item, index) => (
                <div key={index} className='day'>
                    <h3>{item.dt_txt}</h3>
                    <p>Temp: {item.main.temp}°C</p>
                    <p>{item.weather[0].description}</p>
                </div>
            ))}
            </div>
            </>
        )}
        </div>

</div>
)}

export default App