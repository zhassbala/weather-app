<template>
  <div class="flex flex-wrap gap-2 m-2 z-0 relative justify-center items-center">
    <weather-report-card
      v-for="(city, index) in savedCities"
      :key="index"
      :weather="weather.weatherReport[city.id]"
    />
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from "@/stores/weather";
import { useCitiesStore } from "@/stores/cities";
import WeatherReportCard from "../molecules/WeatherReportCard.vue";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const weather = useWeatherStore();
const { savedCities } = storeToRefs(useCitiesStore());
weather.initWeatherReport(savedCities.value);
watch(savedCities, async () => {
  weather.initWeatherReport(savedCities.value);
});
</script>
