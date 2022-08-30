<template>
  <div class="flex gap-4 justify-center">
    <KeyboardCell
      v-for="key in keys"
      :key="key"
      :key-input="key"
      @keystoke="$emit('keystoke', $event)"
    />
  </div>
</template>

<script setup>
import KeyboardCell from "./KeyboardCell.vue";
defineProps({
  keys: Array,
});
</script>
