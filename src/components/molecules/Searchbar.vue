<template>
  <div class="min-w-[16rem] grid m-2">
    <search-input
      v-model="searchText"
      @focus="handleFocus"
      @blur="handleBlur"
      :class="{
        'rounded-b-none': isFocused || searchText.length,
      }"
    />
    <div class="relative h-0">
      <div class="absolute w-full bg-gray-100 border-x">
        <div
          class="p-2 border-y hover:bg-gray-200 cursor-pointer"
          v-if="isFocused || citiesList.length"
          @click="weather.addCurrentLocation()"
        >
          <font-awesome-icon icon="fa-solid fa-location-arrow" class="mr-2" />
          Your current location
        </div>
        <search-result-option
          v-for="(city, index) in citiesList"
          :key="`${city.name}-${city.country}-${city.state}-${index}`"
          :city="city"
          @save="(option) => saveCity(option)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useCitiesStore } from "@/stores/cities";
import type { CityQueryResult } from "@/types";
import SearchResultOption from "@/components/atoms/SearchResultOption.vue";
import SearchInput from "@/components/atoms/SearchInput.vue";
import { useWeatherStore } from "@/stores/weather";

const cities = useCitiesStore();
const weather = useWeatherStore();
const searchText = ref("");
const citiesList = ref<CityQueryResult[]>([]);
const isFocused = ref(false);

const queryCityName = async () => {
  citiesList.value = await cities.queryCityName(searchText.value);
};
const saveCity = (city: CityQueryResult) => {
  searchText.value = "";
  citiesList.value = [];
  cities.saveCity(city);
};

const handleFocus = async () => {
  isFocused.value = true;
  await queryCityName();
};
const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false;
  }, 150);
};
watch(searchText, queryCityName);
</script>
