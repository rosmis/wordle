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

// let date = moment(64800000);
// let date = ref(moment(64800000));
// const date = moment();
// const dateNextWordle = moment(date).add(12, "hours");
// let timer = dateNextWordle.diff(date, "seconds");
// console.log(moment(date).isSame(todayDate));
// const dayBefore = moment(timestamp).subtract(86400, "seconds");

// const time = computed(() => {
//   return date.value.format("HH:mm:ss");
// });

// onMounted(() => {
//   setInterval(() => {
//     date.value = moment(date.value.subtract(1, "seconds"));
//   }, 1000);
// });
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

* {
  font-family: "Poppins", sans-serif;
}
</style>
