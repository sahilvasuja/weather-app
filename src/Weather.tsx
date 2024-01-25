// Weather.tsx
import  { useEffect, useState } from 'react';
import SearchInput from './components/SearchInput';
import WeatherGraph from './components/Weather/WeatherGraph';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';

interface WeatherData {
  today: {
    base: string;
    clouds: { all: number };
    cod: number;
    coord: { lon: number; lat: number };
    dt: number;
    id: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number; 
    };
    name: string;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    visibility: number;
    weather: Array<{ description: string }>; 
    wind: { speed: number; deg: number };
  };
  tomorrow: {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    temp: {
      day: number;
      eve: number;
      max: number;
      min: number;
      morn: number;
      night: number;
    };
    humidity?: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>; 
    
  };
  yesterday: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    humidity?: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>; 
  };
}

const Weather: React.FC = (): JSX.Element => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [appColorIndex, setAppColorIndex] = useState(0);
  

  const weatherColors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#8e44ad'];
  const apiKey = '3ab048289c037f4dc089d11595ad448d';
  const kelvinToCelsius = (kelvin: number): number => {
    return kelvin - 273.15;
  };
  useEffect(() => {
   
    const intervalId = setInterval(() => {
      setAppColorIndex((prevIndex) => (prevIndex + 1) % weatherColors.length);
      
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  const getWeather = async (city: string): Promise<void> => {
   
    try {
        
        const todayResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const todayData = await todayResponse.json();
       
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${todayData.coord.lat}&lon=${todayData.coord.lon}&dt=${Math.round(
            yesterday.getTime() / 1000
          )}&appid=${apiKey}`
        );
        const yesterdayData = await yesterdayResponse.json();

        // Fetch weather data for tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${todayData.coord.lat}&lon=${todayData.coord.lon}&exclude=current,minutely,hourly&dt=${Math.round(
            tomorrow.getTime() / 1000
          )}&appid=${apiKey}`
        );
        const tomorrowData = await tomorrowResponse.json();

        setWeatherData({
          today: todayData,
          yesterday: yesterdayData.current,
          tomorrow: tomorrowData.daily[0],
        });
        toast.success('Result display successfully!');
      } catch (error) {
        toast.error('Invalid City. Please try again.');
  
        console.error('Error fetching weather data:', error);
      }
    };    
  

  return (
   


    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-5/12">
  
    <h1 className="text-4xl font-bold mb-6 text-green-600 text-center"
       style={{ color: weatherColors[appColorIndex] }}
    >Weather App</h1>
    
    <div className="mb-8">
      <SearchInput onSearch={getWeather} />
    </div>
    
    {weatherData && (
      <div className="mt-8">
        <h1 className="text-2xl mb-4 text-center justify-center flex gap-2">
        <MdLocationOn className="text-3xl text-gray-600 inline-block " />
         <p   style={{ color: weatherColors[appColorIndex] }}>{weatherData.today.name},</p> {` ${weatherData.today.sys.country}`}
        </h1>

        <div className="grid grid-cols-1 mt-8 md:grid-cols-3 gap-4 ">
          <div className="bg-purple-600 p-4 rounded-md text-gray-200"
          
          >
            <h2 className="text-lg font-semibold mb-2">Yesterday</h2>
            <p className="text-sm">
              Temperature: {kelvinToCelsius(weatherData.yesterday.temp).toFixed(2)} °C <br />
              Description: {weatherData.yesterday.weather[0].description}<br />
              Humidity: {weatherData.yesterday.humidity}%
            </p>
          </div>

          <div className="bg-[#B43757] p-4 rounded-md  text-gray-200">
            <h2 className="text-lg font-semibold mb-2">Today</h2>
            <p className="text-sm">
              Temperature: {kelvinToCelsius(weatherData.today.main.temp).toFixed(2)} °C<br />
              Description: {weatherData.today.weather[0].description}<br />
              Humidity: {weatherData.today.main.humidity}%
            </p>
          </div>

          <div className="bg-emerald-500 p-4 rounded-md  text-gray-100"
           >
            <h2 className="text-lg font-semibold mb-2">Tomorrow</h2>
            <p className="text-sm">
              Temperature: {kelvinToCelsius(weatherData.tomorrow.temp.day).toFixed(2)} °C<br />
              Description: {weatherData.tomorrow.weather[0].description} <br />
              Humidity: {weatherData.tomorrow.humidity}%
            </p>
          </div>
        </div>
      </div>
    )}
    
    <div className='my-16 w-5/12 '>
          <WeatherGraph weatherData={weatherData} />
        </div>

  </div>
  <ToastContainer />
</div>

  );
}

export default Weather;
