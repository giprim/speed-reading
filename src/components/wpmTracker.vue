<script setup lang="ts">
defineProps({
  wordsPerMinute: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="text-gray-600 rounded-full bg-amber-50 w-16 h-16 flex">
    <div class="text-center m-auto">
      <span class="block font-semibold text-lg leading-3">
        {{ wordsPerMinute }}
      </span>
      <span class="block font-light text-sm leading-3"> WPM </span>
    </div>
  </div>
</template>
