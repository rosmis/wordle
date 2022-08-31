<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <TableRow :key-array="wordObject[1]" />
    <TableRow :key-array="wordObject[2]" />
    <TableRow />
    <TableRow />
    <TableRow />
    <TableRow />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import TableRow from "./TableRow.vue";

const props = defineProps({
  keyInput: String,
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
  () => props.keyInput,
  () => {
    wordChecker(props.keyInput);
  }
);

function wordChecker(letter) {
  const rowCounter = ref(1);
  const wordObjectKeyValue = wordObject.value[rowCounter.value];

  if (letter === "ENTER") {
    if (wordObjectKeyValue.length < 4) return;

    rowCounter.value++;
    console.log(rowCounter.value);
    console.log("enter");
    return;
  }

  // if (letter === "DEL") {
  //   wordObjectKeyValue.pop();
  //   // letter =
  //   //   wordObjectKeyValue[
  //   //     wordObjectKeyValue.length - 1
  //   //   ];
  //   letter = "";
  // }

  if (wordObjectKeyValue.length >= 5) {
    console.log("sens interdit");
    console.log(wordObjectKeyValue.length);
    console.log("counter", rowCounter.value);
    return;
  }

  if (letter) {
    wordObjectKeyValue.push(letter);
    // console.log(wordObjectKeyValue);
    console.log("letter");
  }

  console.log("objectKeyValue", wordObjectKeyValue);
}
</script>
