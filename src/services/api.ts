import type { CityQueryResult } from "@/types";
import axios from "axios";

export const API_KEY = "3e0d9aedabe5c6feb0bdcf4aef801a9e";
export const BASE_URL = "https://api.openweathermap.org/";

export const getWeatherData = async ({ lat, lon }: { lat: number; lon: number }) => {
  return await axios.get(
    BASE_URL + `data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
};

export const queryCityName = async (cityName: string): Promise<CityQueryResult[]> => {
  const res = await axios.get(BASE_URL + `geo/1.0/direct?q=${cityName}&limit=10&appid=${API_KEY}`);
  return res.data;
};

export const getCurrentLocation = async (): Promise<{
  lat: number;
  lon: number;
}> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords);
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => reject("Unable to get current location: " + err),
      { enableHighAccuracy: true },
    );
  });
};
