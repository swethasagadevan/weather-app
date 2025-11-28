import React, { useState } from 'react';
import './weather.css';
import axios from 'axios';

const Weather = () => {

  const [city,setCity]=useState("")
  const [cityWeather,setCityWeather] =useState("")
  const [temparature,setTemparature] =useState("")
  const [description,setDescription]=useState("")
  const [Humidity,setHumidity]=useState("")

  const [isCity ,setIsCity] = useState(false)
  const [isError,setIsError] =useState(false)
  const [isVisible,setIsVisible]=useState(false)


  const handlecity =(e)=>{
    setCity(e.target.value)
    console.log(city)
  }

  const handleGetWeather =()=>{

      if (city){
        console.log(true)
        setIsCity(false);
        setIsError(false)
        setIsVisible(true)
        const weatherdetails = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=609f3c63e9672e70ee242c59d6160194`)

        weatherdetails.then((data)=>{
        console.log(data.data);
        setCityWeather(data.data.weather[0].main);
        setTemparature(data.data.main.temp);
        setDescription(data.data.weather[0].description);
        setHumidity(data.data.main.humidity);
      })
      .catch(errmsg=> {
        setIsError(true);
        setIsVisible(false);
        console.log(errmsg)
        setCityWeather("");
        setTemparature("");
        setDescription("");
        setHumidity("");
      })
      }
      else{
        console.log(false)
        setIsCity(true)
        setIsVisible(false)
        setCityWeather("");
        setTemparature("");
        setDescription("");
        setHumidity("");

      }
    
      
  }

  return (
    <section className='sectionWeather'>

      <h1 className='title'>Weather Report</h1>
      <p className='title-para'>I can give you weather report about your city!</p>

      <div className='container'>
        
        <div className='container_form'>
        <input name="cityname" type="text" onChange={handlecity} placeholder='Enter city ...'/>
        {isCity && <p className='form__errmsg'>Please enter your city...</p>}
        <br/>
        <button onClick={handleGetWeather}>GET REPORT</button>
        </div>

       {isError && <h4 className='container_errmsg'>City Not found</h4>}

      {isVisible && <div className='container_table'>
            <div> Weather : {cityWeather}</div>
            <div> Temparature : {temparature}</div>
            <div> Description : {description}</div>
            <div> Humidity : {Humidity}</div>
    
      </div>}
      </div>

    </section>
  )
}

export default Weather;