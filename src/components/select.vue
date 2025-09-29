<script setup lang="ts">
type option = {
  value: string;
  label: string;
};

defineProps({
  options: {
    type: Array<option>,
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="font-medium">{{ label }}</label>
    <select
      v-bind="$attrs"
      class="border border-gray-300 rounded-md px-4 py-2 w-full"
    >
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
