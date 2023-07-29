<template>
  <div class="p-2 px-4 bg-white border min-w-[16rem] flex items-center gap-4">
    <font-awesome-icon icon="fa-solid fa-bars" class="draggable-icon" />
    <div class="grow">
      <div>
        {{ city.name }}
        <font-awesome-icon
          v-if="
            city.name === weather.currentLocation.city.name &&
            city.country === weather.currentLocation.city.country
          "
          icon="fa-solid fa-location-arrow"
          class="mr-2"
        />
      </div>
      <div class="text-sm text-gray-400">
        {{ city.country }}{{ city.state && ", " + city.state }}
      </div>
    </div>
    <font-awesome-icon
      icon="fa-solid fa-circle-xmark"
      class="w-5 h-5 text-gray-500 cursor-pointer"
      @click="deleteCity(city)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useCitiesStore } from "@/stores/cities";
import { useWeatherStore } from "@/stores/weather";
import type { City } from "@/types";
import type { PropType } from "vue";

defineProps({
  city: {
    type: Object as PropType<City>,
    required: true,
  },
});

const { deleteCity } = useCitiesStore();
const weather = useWeatherStore();
</script>
