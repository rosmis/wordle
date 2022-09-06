<template>
  <div
    class="border border-gray-500 h-10 w-10"
    @click="$emit('keystroke', { keyboardInput, id: Math.random() })"
  >
    <p
      v-if="keyInput !== 'Enter' && keyInput !== 'Backspace'"
      class="cursor-pointer flex h-full w-full text-light-800 items-center justify-center"
    >
      {{ keyboardInput }}
    </p>
    <i
      v-if="keyInput === 'Enter'"
      class="cursor-pointer flex h-full text-xl w-full text-light-800 z-40 justify-center items-center mdi mdi-keyboard-return"
    ></i>
    <i
      v-if="keyInput === 'Backspace'"
      class="cursor-pointer flex h-full text-xl w-full text-light-800 z-40 justify-center items-center mdi mdi-backspace-outline"
    ></i>
  </div>
</template>

<script setup>
import "@mdi/font/css/materialdesignicons.css";
import { onMounted } from "vue";

const props = defineProps({
  keyInput: String,
});

const emit = defineEmits("keystroke");

const keyboardInput = props.keyInput.toUpperCase();

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === props.keyInput)
      emit("keystroke", { keyboardInput, id: Math.random() });
  });
});
</script>
