<template>
  <div class="flex flex-col gap-4">
    <KeyboardRow
      :keys="keyboard.firstLine"
      @keystroke="$emit('keystroke', $event)"
    />
    <KeyboardRow
      :keys="keyboard.secondLine"
      @keystroke="$emit('keystroke', $event)"
    />
    <KeyboardRow
      :keys="keyboard.thirdLine"
      @keystroke="$emit('keystroke', $event)"
    />
  </div>
</template>

<script setup>
import KeyboardRow from "./KeyboardRow.vue";

const keyboard = {
  firstLine: ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  secondLine: ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  thirdLine: ["Enter", "w", "x", "c", "v", "b", "n", "Backspace"],
};
</script>
