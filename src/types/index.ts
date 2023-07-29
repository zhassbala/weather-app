export type CityQueryResult = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state?: string;
  local_names?: {
    [key: string]: string;
  };
};

export type City = CityQueryResult & {
  id: string;
};

export type WeatherInfo = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type WeatherReport = {
  id: string;
  weatherInfo: WeatherInfo;
};
