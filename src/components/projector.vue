<script setup lang="ts">
import type { FormType } from "../types";
import WPMTracker from "./wpmTracker.vue";
import { ref, computed, onMounted } from "vue";

const props = withDefaults(
  defineProps<FormType & { toggleForm: (state: boolean) => void }>(),
  {
    numberOfWordsOnDisplay: 1, // default = 1
  },
);

const word = ref("");
const currentIndex = ref(0);
const isPaused = ref(false);
const countdown = ref(0);

let intervalId: ReturnType<typeof setInterval> | null = null;
let countdownId: ReturnType<typeof setInterval> | null = null;

// Interval per word group: higher speed → faster change
const getInterval = () => 2000 / props.speed;

// Calculate WPM = words per minute actually displayed
const wordsPerMinute = computed(() => {
  const intervalMs = getInterval();
  // WPM = (words shown per update * updates per minute)
  return Math.round((60000 / intervalMs) * props.numberOfWordsOnDisplay);
});

const startFunction = () => {
  stopFunction();
  props.toggleForm(false);
  const content = props.content.split(" ").filter(Boolean);
  if (content.length === 0) return;

  countdown.value = 4;
  countdownId = setInterval(() => {
    countdown.value--;
    word.value = `${countdown.value}`;
    if (countdown.value <= 0) {
      clearInterval(countdownId!);
      countdownId = null;
      beginProjection(content);
    }
  }, 1000);
};

const beginProjection = (content: string[]) => {
  currentIndex.value = 0;
  word.value = content
    .slice(
      currentIndex.value,
      currentIndex.value + props.numberOfWordsOnDisplay,
    )
    .join(" ");
  isPaused.value = false;

  intervalId = setInterval(() => {
    if (isPaused.value) return;

    currentIndex.value += props.numberOfWordsOnDisplay;

    if (currentIndex.value >= content.length) {
      stopFunction();
    } else {
      word.value = content
        .slice(
          currentIndex.value,
          currentIndex.value + props.numberOfWordsOnDisplay,
        )
        .join(" ");
    }
  }, getInterval());
};

const togglePauseResume = () => {
  if (!intervalId) return;
  isPaused.value = !isPaused.value;
};

const resetFunction = () => {
  word.value = props.content.split(" ")[0] || "";
};

const stopFunction = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (countdownId) {
    clearInterval(countdownId);
    countdownId = null;
  }
  currentIndex.value = 0;
  word.value = "";
  countdown.value = 0;
  isPaused.value = false;
  props.toggleForm(true);
};

computed(() => {
  if (props.content.length) resetFunction();
});

onMounted(() => {
  resetFunction();
});
</script>

<template>
  <div
    :class="[
      'min-h-2/4',
      'w-full',
      'aspect-video',
      'relative',
      'overflow-hidden',
    ]"
    :style="{ backgroundColor: bgColor }"
  >
    <!-- Show calculated WPM -->
    <div class="absolute bottom-3 right-3 overflow-hidden">
      <WPMTracker :wordsPerMinute />
    </div>

    <div class="space-y-4 absolute bottom-3 left-3">
      <div class="flex gap-2 opacity-0 hover:opacity-100">
        <button
          @click="startFunction"
          class="px-3 py-1 bg-green-500 text-white rounded"
        >
          Start
        </button>

        <button
          v-if="intervalId"
          @click="togglePauseResume"
          class="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          {{ isPaused ? "Resume" : "Pause" }}
        </button>

        <button
          @click="stopFunction"
          class="px-3 py-1 bg-red-500 text-white rounded"
        >
          Stop
        </button>
      </div>
    </div>
    <div class="flex justify-center items-center h-full p-8">
      <p
        :style="{
          color: textColor,
          'font-size': `${fontSize}em`,
        }"
      >
        {{ word }}
      </p>
    </div>
  </div>
</template>
