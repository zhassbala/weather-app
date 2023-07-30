import { ref } from "vue";
import { defineStore } from "pinia";
import type { CityQueryResult, City } from "@/types";
import * as api from "@/services/api";

export const useCitiesStore = defineStore("cities", () => {
  const getLocalStorageSavedCities = (): City[] =>
    JSON.parse(localStorage.getItem("weather-app-cities-list") || "[]");
  const savedCities = ref<City[]>(
    getLocalStorageSavedCities().map((city) => {
      if (!city.id) city.id = `${city.lat}+${city.lon}`;
      return city;
    }),
  );

  const saveCity = (city: CityQueryResult) => {
    const cityId = `${city.lat}+${city.lon}`;
    const updatedCityList: City[] = [
      { ...city, id: cityId },
      ...savedCities.value.filter((el) => el.id !== cityId),
    ];
    localStorage.setItem("weather-app-cities-list", JSON.stringify(updatedCityList));
    savedCities.value = updatedCityList;
  };
  const bulkSave = (citiesList: City[]) => {
    localStorage.setItem("weather-app-cities-list", JSON.stringify(citiesList));
    savedCities.value = citiesList;
  };
  const deleteCity = (city: City) => {
    const updatedCityList = savedCities.value.filter((el) => el.id !== city.id);
    localStorage.setItem("weather-app-cities-list", JSON.stringify(updatedCityList));
    savedCities.value = updatedCityList;
  };

  const queryCityName = async (cityName: string) => {
    if (!cityName) return [];
    const cities = await api.queryCityName(cityName);
    const savedCitiesCoordinates = savedCities.value.map((el) => `${el.lat}+${el.lon}`);
    return cities.filter((el) => !savedCitiesCoordinates.includes(`${el.lat}+${el.lon}`));
  };

  return {
    savedCities,
    queryCityName,
    saveCity,
    deleteCity,
    bulkSave,
  };
});
