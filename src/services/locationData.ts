import type { CityQueryResult, WeatherInfo } from "@/types";
import { getWeatherData, getCurrentLocation } from "./api";

export class LocationData {
  city: CityQueryResult;
  weatherData?: WeatherInfo;
  initialized: boolean;

  constructor() {
    this.city = {
      name: "",
      country: "",
      lat: 0,
      lon: 0,
    };
    this.initialized = false;
  }
  getId() {
    return this.city.lat && this.city.lon ? `${this.city.lat}+${this.city.lon}` : "";
  }
  async getCurrentLocation(): Promise<CityQueryResult> {
    const { lat, lon } = await getCurrentLocation();
    this.city.lat = lat;
    this.city.lon = lon;
    return this.city;
  }
  async init() {
    const { lat, lon } = await this.getCurrentLocation();
    await getWeatherData({ lat, lon }).then((res) => {
      this.city.name = res.data.name;
      this.city.country = res.data.sys?.country || "";
      this.weatherData = res.data;
    });
    this.initialized = true;
  }
}
