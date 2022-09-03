<template>
  <div class="flex flex-col h-screen bg-gray-900 gap-10">
    <WordleHeader />
    <TableGrid :key-input-object="keyLog ? keyLog : ''" />
    <KeyboardGrid @keystroke="keyLog = $event" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import KeyboardGrid from "./components/KeyboardGrid.vue";
import TableGrid from "./components/TableGrid.vue";
import WordleHeader from "./components/WordleHeader.vue";

let keyLog = ref({});

function consoleLog() {
  console.log("works");
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

* {
  font-family: "Poppins", sans-serif;
}
</style>
