<template>
  <div
    class="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 border-b min-w-[16rem]"
    @click="emit('save', city)"
  >
    <div>{{ city.name }}</div>
    <div class="text-sm text-gray-500">{{ city.country }}{{ city.state && ", " + city.state }}</div>
  </div>
</template>

<script setup lang="ts">
import type { CityQueryResult } from "@/types";
import type { PropType } from "vue";

defineProps({
  city: {
    type: Object as PropType<CityQueryResult>,
    required: true,
  },
});
const emit = defineEmits(["save"]);
</script>
