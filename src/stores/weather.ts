import { defineStore, storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useCitiesStore } from "./cities";
import { LocationData } from "@/services/locationData";
import { getWeatherData } from "@/services/api";

export const useWeatherStore = defineStore("weather", () => {
  const { saveCity } = useCitiesStore();
  const { savedCities } = storeToRefs(useCitiesStore());
  const currentLocation = ref<LocationData>(new LocationData());
  const weatherReport = ref<{ [key: string]: any }>({});
  const initWeatherReport = async () => {
    const promiseArr = [];
    for (const city of savedCities.value) {
      if (weatherReport.value[city.id]) continue; // only update cities that we don't have weather data for
      const weatherData = getWeatherData(city).then(
        (res) => (weatherReport.value[city.id] = res.data),
      );
      promiseArr.push(weatherData);
    }
    if (!currentLocation.value.initialized) promiseArr.push(currentLocation.value.init());
    await Promise.allSettled(promiseArr).then(async () => {
      if (savedCities.value.length <= 0) await addCurrentLocation();
    });
  };
  const addCurrentLocation = async () => {
    if (!currentLocation.value.initialized) {
      await currentLocation.value.init();
    }
    saveCity(currentLocation.value.city);
  };
  watch(savedCities, initWeatherReport);
  return {
    currentLocation,
    weatherReport,
    getWeatherData,
    initWeatherReport,
    addCurrentLocation,
  };
});
