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
import { ref, watch } from "vue";
import TableRow from "./TableRow.vue";

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
