<script setup lang="ts">
import Form from "./components/form.vue";
import Projector from "./components/projector.vue";

import { ref } from "vue";
import type { FormType } from "./types";
const showform = ref(true);

const toggleForm = (value: boolean) => {
  showform.value = value;
};

const state = ref<FormType>({
  textColor: "#ffffff",
  bgColor: "#192912",
  fontSize: 5, // font size in em
  content: "",
  speed: 2,
  numberOfWordsOnDisplay: 1,
});
</script>

<template>
  <div class="mx-auto h-screen flex relative">
    <div class="space-y-4 fixed z-20 top-3 left-3">
      <div class="flex gap-2 opacity-0 hover:opacity-100">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="toggleForm(!showform)"
        >
          form
        </button>
      </div>
    </div>
    <Projector v-bind="state" v-bind:toggleForm="toggleForm" />
    <div v-if="showform" class="p-4 m-auto min-w-[450px] shadow">
      <Form v-model="state" />
    </div>
  </div>
</template>
