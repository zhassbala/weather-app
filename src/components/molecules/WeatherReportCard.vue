<template>
  <div
    class="inline-flex flex-col justify-between h-[230px] w-[280px] border rounded-lg p-4 bg-gray-100 font-light"
    v-if="weather"
  >
    <div class="grid grid-cols-2 justify-start">
      <img
        :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
        :alt="weather.weather[0]?.main || weather.name"
        class="brightness-150 saturate-200 contrast-200 drop-shadow"
      />
      <div>
        <p class="text-4xl">{{ weather.main.temp.toFixed(1) }}° C</p>
        <p class="text-md">
          {{ weather.name }}, {{ weather.sys.country }}
          <font-awesome-icon
            v-if="
              weather.name === currentLocation.city.name &&
              weather.sys.country === currentLocation.city.country
            "
            icon="fa-solid fa-location-arrow"
            class="mr-2"
          />
        </p>
        <div class="text-xs mt-2">
          <p>
            <font-awesome-icon icon="fa-solid fa-gauge-high" />
            {{ weather.main.pressure }}hPa
          </p>
          <p>Humidity: {{ weather.main.humidity }}%</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-5 col-span-2">
      <div class="flex flex-col col-span-2 text-sm">
        <p>
          <font-awesome-icon icon="fa-solid fa-wind" />
          {{ weather.wind.speed }} km/h
        </p>
        <p>
          <font-awesome-icon
            icon="fa-solid fa-location-arrow"
            :style="{
              transform: `rotate(${weather.wind.deg + 135}deg)`,
            }"
          />
          {{ weather.wind.deg }}°
          {{ convertWindDirection(weather.wind.deg) }}
        </p>
      </div>
      <div class="col-span-3">
        <p class="leading-5">
          Feels like <span class="font-normal">{{ weather.main.feels_like }}° C</span>.
          <span class="capitalize">
            {{ weather.weather[0].description }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { WeatherInfo } from "@/types";
import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

defineProps({
  weather: {
    type: Object as PropType<WeatherInfo | undefined>,
    required: true,
  },
});

const { currentLocation } = storeToRefs(useWeatherStore());
const convertWindDirection = (degrees: number) => {
  const index = Math.ceil(degrees / 22.5 + 0.5) % 16;
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[index];
};
</script>
