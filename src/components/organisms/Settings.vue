<template>
  <div class="flex flex-col justify-start h-full" @click.stop>
    <searchbar />
    <p class="text-lg font-medium mx-2 px-1 py-2" v-if="store.savedCities?.length">Saved cities:</p>
    <div class="inline-grid m-2 overflow-scroll" v-if="store.savedCities?.length">
      <saved-cities-list />
    </div>
    <p class="text text-gray-600 mx-1 my-2" v-else>No saved cities.</p>
  </div>
</template>

<script setup lang="ts">
import { useCitiesStore } from "@/stores/cities";
import SavedCitiesList from "@/components/molecules/SavedCitiesList.vue";
import Searchbar from "@/components/molecules/Searchbar.vue";

const store = useCitiesStore();
</script>
