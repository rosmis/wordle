<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <TableRow :key-array="wordObject[1]" />
    <TableRow :key-array="wordObject[2]" />
    <TableRow :key-array="wordObject[3]" />
    <TableRow :key-array="wordObject[4]" />
    <TableRow :key-array="wordObject[5]" />
    <TableRow :key-array="wordObject[6]" />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { options } from "./axios_params.js";
import TableRow from "./TableRow.vue";

onMounted(() => {
  if (localStorage.solution) return;

  axios
    .request(options)
    .then(function (response) {
      localStorage.solution = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
});

const props = defineProps({
  keyInputObject: Object,
});

let wordObject = ref({
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
});

watch(
  () => props.keyInputObject,
  () => {
    wordChecker(props.keyInputObject.keyboardInput);
  }
);

const rowCounter = ref(1);

function wordChecker(letter) {
  const wordObjectKeyValue = wordObject.value[rowCounter.value];

  if (letter === "ENTER") {
    if (wordObjectKeyValue.length < 4) return;

    rowCounter.value++;
    console.log("enter");
    return;
  }

  if (letter === "DEL") {
    wordObjectKeyValue.pop();
    return;
  }

  if (wordObjectKeyValue.length >= 5) {
    return;
  }

  wordObjectKeyValue.push(letter);
}
</script>
