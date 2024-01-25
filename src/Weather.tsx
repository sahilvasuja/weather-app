// Weather.tsx
import  { useState } from 'react';
import SearchInput from './components/SearchInput';
import WeatherGraph from './components/WeatherGraph';
import { ToastContainer, toast } from 'react-toastify';

interface WeatherProps {}

interface WeatherData {
  tomorrow: string;
  today: string;
  yesterday: string;
  name: string;
  sys: {
    country: string;
  };
  weather: [
    {
      description: string;
    }
  ];
  main: {
    temp: number;
    humidity: number;
  };
}

function Weather({}: WeatherProps): JSX.Element {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

//   const apiKey = process.env.REACT_APP_API_KEY || '';

  const apiKey = '3ab048289c037f4dc089d11595ad448d';
  const kelvinToCelsius = (kelvin: number): number => {
    return kelvin - 273.15;
  };
  const getWeather = async (city: string): Promise<void> => {
    try {
        // Fetch weather data for today
        const todayResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const todayData = await todayResponse.json();
        // Fetch weather data for the previous day
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
    <div className="bg-white p-8 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
    
        {/* <h1 className="text-3xl font-bold mb-4">Weather App</h1> */}
        <h1 className="text-4xl font-bold mb-6 text-center">Weather App</h1>
    
        <SearchInput onSearch={getWeather} />
        
    {weatherData && (
      <div>
        <h1 className="text-2xl mb-4 text-center">
          {`${weatherData.today.name}, ${weatherData.today.sys.country}`}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Yesterday</h2>
            <p className="text-sm">
              Temperature: {kelvinToCelsius(weatherData.yesterday.temp).toFixed(2)} °C<br />
              Description: {weatherData.yesterday.weather[0].description}<br />
              Humidity: {weatherData.yesterday.humidity}%
            </p>
          </div>

          <div className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Today</h2>
            <p className="text-sm">
              Temperature: {kelvinToCelsius(weatherData.today.main.temp).toFixed(2)} °C<br />
              Description: {weatherData.today.weather[0].description}<br />
              Humidity: {weatherData.today.main.humidity}%
            </p>
          </div>

          <div className="bg-gray-200 p-4 rounded-md">
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
       
       
        <div className='my-12 '>
        <WeatherGraph  weatherData={weatherData} />
        </div>
         
      </div>
      <ToastContainer />
    </div>
  );
}

export default Weather;
