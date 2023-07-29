<template>
  <draggable
    v-model="store.savedCities"
    group="savedCities"
    @end="onDragEnd"
    item-key="id"
    handle=".draggable-icon"
  >
    <template v-slot:item="{ element }">
      <city-card :city="element" />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { useCitiesStore } from "@/stores/cities";
import CityCard from "@/components/atoms/CityCard.vue";

import draggable from "vuedraggable";

const onDragEnd = () => {
  store.bulkSave(store.savedCities);
};
const store = useCitiesStore();
</script>
