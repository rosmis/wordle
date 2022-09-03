<template>
  <div
    class="border flex border-gray-500 h-10 w-10 items-center justify-center"
    @click="$emit('keystoke', { keyboardInput, id: Math.random() })"
  >
    <p class="cursor-default text-light-800">{{ keyboardInput }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  keyInput: String,
});

const keyboardInput = props.keyInput.toUpperCase();
</script>
