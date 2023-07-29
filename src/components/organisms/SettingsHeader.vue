<script setup lang="ts">
import { ref } from "vue";
import Settings from "@/components/organisms/Settings.vue";

const settingsOpen = ref(false);
const settingsWrapper = ref<HTMLElement | null>(null);
</script>

<template>
  <div class="h-16 bg-transparent sticky z-10 top-0 left-0 w-full">
    <div class="h-full p-4 flex justify-end items-center backdrop-blur-lg">
      <font-awesome-icon
        icon="fa-solid fa-gear"
        class="h-6 w-6 text-gray-500 cursor-pointer transition"
        :class="{
          'rotate-90': settingsOpen,
        }"
        @click="settingsOpen = !settingsOpen"
      />
    </div>
    <div
      class="overflow-hidden transition-all duration-500 bg-transparent backdrop-blur-lg"
      :class="{
        'h-[400px] shadow': settingsOpen,
        'h-0': !settingsOpen,
      }"
      ref="settingsWrapper"
    >
      <settings />
    </div>
  </div>
</template>
