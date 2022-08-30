<template>
  <div class="flex flex-col h-full gap-20">
    <TableGrid :key-input="keyLog ? keyLog : ''" />
    <KeyboardGrid @keystroke="keyLog = $event" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import KeyboardGrid from "./components/KeyboardGrid.vue";
import TableGrid from "./components/TableGrid.vue";

let keyLog = ref("");
</script>
