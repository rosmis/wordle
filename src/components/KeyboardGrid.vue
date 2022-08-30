<template>
  <div class="flex flex-col gap-4">
    <KeyboardRow :keys="keyboard.firstLine"></KeyboardRow>
    <KeyboardRow :keys="keyboard.secondLine"></KeyboardRow>
    <KeyboardRow :keys="keyboard.thirdLine"></KeyboardRow>
  </div>
</template>

<script setup>
import KeyboardRow from "./KeyboardRow.vue";

const keyboard = {
  firstLine: ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  secondLine: ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  thirdLine: ["enter", "w", "x", "c", "v", "b", "n", "del"],
};
</script>
