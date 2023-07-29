// import type { CityQueryResult, City } from "@/types";
// import * as api from "@/services/api";

// export const saveCity = (city: CityQueryResult) => {
//   const cityId = `${city.lat}+${city.lon}`;
//   const updatedCityList: City[] = [
//     ...savedCities.value.filter((el) => el.id !== cityId),
//     { ...city, id: cityId },
//   ];
//   localStorage.setItem("weather-app-cities-list", JSON.stringify(updatedCityList));
//   savedCities.value = updatedCityList;
// };
// export const bulkSave = (citiesList: City[]) => {
//   localStorage.setItem("weather-app-cities-list", JSON.stringify(citiesList));
//   savedCities.value = citiesList;
// };
// export const deleteCity = (city: City) => {
//   const updatedCityList = savedCities.value.filter((el) => el.id !== city.id);
//   localStorage.setItem("weather-app-cities-list", JSON.stringify(updatedCityList));
//   savedCities.value = updatedCityList;
// };

// export const queryCityName = async (cityName: string) => {
//   if (!cityName) return [];
//   const cities = await api.queryCityName(cityName);
//   const savedCitiesCoordinates = savedCities.value.map((el) => `${el.lat}+${el.lon}`);
//   return cities.filter((el) => !savedCitiesCoordinates.includes(`${el.lat}+${el.lon}`));
// };
