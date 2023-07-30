import { defineStore } from "pinia";
import { ref } from "vue";
import { LocationData } from "@/services/locationData";
import { getWeatherData } from "@/services/api";
import type { City, WeatherInfo } from "@/types";

export const useWeatherStore = defineStore("weather", () => {
  const currentLocation = ref<LocationData>(new LocationData());
  const weatherReport = ref<{ [key: string]: WeatherInfo }>({});
  const initWeatherReport = async (savedCities: City[]) => {
    if (savedCities.length <= 0) {
      await addCurrentLocation();
      return;
    }
    const promiseArr = [];
    for (const city of savedCities) {
      if (weatherReport.value[city.id]) continue; // only update cities that we don't have weather data for
      const weatherData = getWeatherData(city).then(
        (res) => (weatherReport.value[city.id] = res.data),
      );
      promiseArr.push(weatherData);
    }
    if (!currentLocation.value.initialized) promiseArr.push(currentLocation.value.init());
    await Promise.allSettled(promiseArr);
  };
  const addCurrentLocation = async () => {
    if (!currentLocation.value.initialized) {
      await currentLocation.value.init();
    }
  };
  return {
    currentLocation,
    weatherReport,
    getWeatherData,
    initWeatherReport,
    addCurrentLocation,
  };
});
