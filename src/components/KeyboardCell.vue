<template>
  <div
    class="border flex border-gray-500 h-10 w-10 items-center justify-center"
    @click="$emit('keystoke', keyboardInput)"
  >
    <p class="cursor-default">{{ keyboardInput }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  keyInput: String,
});

const keyboardInput = props.keyInput.toUpperCase();
</script>
