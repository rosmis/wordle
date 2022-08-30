<template>
  <div class="flex gap-4">
    <!-- <KeyboardCell></KeyboardCell> -->
    <h1>{{ keys }}</h1>
  </div>
</template>

<script setup>
// import KeyboardCell from './KeyboardCell.vue';
defineProps({
  keys: Array,
});
</script>
