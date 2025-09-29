<script setup lang="ts">
import Input from "./input.vue";
import Textarea from "./textarea.vue";
import { defineProps, defineEmits } from "vue";
import type { FormType } from "../types";

// Props for v-model
const props = defineProps<{
  modelValue: FormType;
}>();

// Emit update event for v-model
const emit = defineEmits<{
  (e: "update:modelValue", value: FormType): void;
}>();

// Function to update parent state
function updateField<K extends keyof FormType>(key: K, value: FormType[K]) {
  emit("update:modelValue", { ...props.modelValue, [key]: value });
}
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        type="color"
        :value="modelValue?.textColor"
        name="textColor"
        placeholder="Enter text color"
        label="Text Color"
        @input="updateField('textColor', $event.target.value)"
      />
      <Input
        label="Background Color"
        type="color"
        name="bgColor"
        placeholder="Enter background color"
        :value="modelValue?.bgColor"
        @input="updateField('bgColor', $event.target.value)"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        :value="modelValue?.fontSize"
        type="number"
        name="fontSize"
        placeholder="Enter font size"
        label="Font Size"
        @input="updateField('fontSize', Number($event.target.value))"
      />
      <Input
        :value="modelValue?.speed"
        label="Speed"
        type="number"
        name="speed"
        placeholder="Enter speed"
        @input="updateField('speed', Number($event.target.value))"
      />
    </div>
    <Input
      label="Number of words"
      type="number"
      name="numberOfWordsOnDisplay"
      placeholder="Enter number of words"
      :value="modelValue?.numberOfWordsOnDisplay"
      @input="
        updateField('numberOfWordsOnDisplay', Number($event.target.value))
      "
    />
    <Textarea
      rows="5"
      label="Content"
      name="content"
      placeholder="What words do you want to speed read?"
      :value="modelValue?.content"
      @input="updateField('content', $event.target.value)"
    />
  </div>
</template>
