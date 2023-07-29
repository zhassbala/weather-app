<template>
  <div class="flex flex-wrap gap-2 m-2 z-0 relative justify-center items-center">
    <weather-report-card
      v-for="(city, index) in cities.savedCities"
      :key="index"
      :weather="weather.weatherReport[city.id]"
    />
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from "@/stores/weather";
import WeatherReportCard from "../molecules/WeatherReportCard.vue";
import { useCitiesStore } from "@/stores/cities";

const weather = useWeatherStore();
const cities = useCitiesStore();
weather.initWeatherReport();
</script>
