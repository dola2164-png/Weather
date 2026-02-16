import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import sun_icon from '../assets/sun.png'
import cloud_icon from '../assets/cloud.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'
import rain_icon from '../assets/rain.png'
import moon_icon from '../assets/moon.png'
import humidity_icon from '../assets/humidity.png'
import drizzle_icon from '../assets/drizzle.png'
import dc_icon from '../assets/darkcloud.png'
import mc_icon from '../assets/mooncloud.png'
import sc_icon from '../assets/suncloud.png'
import th_icon from '../assets/thunder.png'
import wc_icon from '../assets/wc.png'
import er_icon from '../assets/er.png'
const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setweatherData] = useState(false);
   const [error, setError] = useState(false)
  const allIcons = {
"01d": sun_icon,
"01n": moon_icon,
"02d": sc_icon,
"02n": mc_icon,
"03d": cloud_icon,
"03n": cloud_icon,
"04d": dc_icon,
"04n": dc_icon,
"09d": drizzle_icon,
"09n": drizzle_icon,
"10d": rain_icon,
"10n": rain_icon,
"11d": th_icon,
"11n": th_icon,
"13d": snow_icon,
"13n": snow_icon,
  }
   
const search =async (city)=>{
  if(city === ""){
    alert("Enter City Name");
    return;
  }
     setError(false)
  try{
 
const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
const response = await fetch(url);
const data =await response.json();
if(!response.ok){
   setError(true) 
  alert(data.message);
    setweatherData(false) 
  return;
}
console.log(data);
const icon = allIcons[data.weather[0].icon] || sun_icon;
setweatherData({
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  temperature: data.main.temp,
  location: data.name,
  icon: icon
})
  }catch (error) {
    setweatherData(false);
    console.error("Error");
  }
}

useEffect(()=>{
 // search("Kolkata");
},[])
  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search...' />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      { error ? (
        <div className="default-screen">
          <img src={er_icon} alt="error" className='wc-icon' />
          <p className="welcome-text">City not found 😔</p>
        </div>
      ) :
      //
      weatherData ? ( 
        <>
       <img src={weatherData.icon} alt="sun" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div></>) : (<div className="default-screen">
          <img src={wc_icon} alt="welcome" className='wc-icon' />
          <p className="welcome-text">Check the weather 🌤️</p>
        </div>
      )
    }
     
    </div>
  )
}

export default Weather
