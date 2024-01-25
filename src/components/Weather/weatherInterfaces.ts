
  interface WeatherData {
    today?: {
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
        pressure?: number;
        humidity?: number; // Include humidity
      };
      name?: string;
      sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
      };
      timezone: number;
      visibility: number;
      weather: Array<{ description: string }>; // Include description
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
      // Include other properties
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
  export interface WeatherGraphProps {
    weatherData: WeatherData | null;
  }
  
  export default WeatherData;