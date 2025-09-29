<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="font-medium">{{ label }}</label>
    <input
      v-bind="$attrs"
      class="border border-gray-300 rounded-md px-4 py-2 w-full"
    />
  </div>
</template>
