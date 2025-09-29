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
    <Projector
      v-bind="state"
      v-bind:toggleForm="toggleForm"
      v-bind:formState="showform"
    />
    <div v-if="showform" class="p-4 m-auto min-w-[450px] shadow">
      <Form v-model="state" />
    </div>
  </div>
</template>
