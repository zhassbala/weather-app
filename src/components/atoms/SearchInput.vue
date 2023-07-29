<template>
  <div class="border rounded-lg inline-flex px-4 py-3 items-center gap-2 bg-white h-[50px]">
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="w-4 h-4 text-gray-400" />
    <input
      class="border-none outline-none grow"
      type="text"
      v-model="searchText"
      @focus="emit('focus')"
      @blur="emit('blur')"
      placeholder="Add location..."
    />
    <font-awesome-icon
      v-show="searchText.length > 0"
      icon="fa-solid fa-circle-xmark"
      class="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-500"
      @click="searchText = ''"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

defineProps({
  modelValue: {
    type: String,
    default: () => "",
  },
});
const searchText = ref("");
const emit = defineEmits(["update:modelValue", "focus", "blur"]);
watch(searchText, () => emit("update:modelValue", searchText.value));
</script>
