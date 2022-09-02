<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <TableRow :key-array="wordObject[1]" :evaluations="evaluations[1]" />
    <TableRow :key-array="wordObject[2]" :evaluations="evaluations[2]" />
    <TableRow :key-array="wordObject[3]" :evaluations="evaluations[3]" />
    <TableRow :key-array="wordObject[4]" :evaluations="evaluations[4]" />
    <TableRow :key-array="wordObject[5]" :evaluations="evaluations[5]" />
    <TableRow :key-array="wordObject[6]" :evaluations="evaluations[6]" />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { options } from "./axios_params.js";
import TableRow from "./TableRow.vue";

// window.localStorage.clear();

onMounted(() => {
  if (localStorage.wordleState) {
    const wordleState = JSON.parse(localStorage.getItem("wordleState"));
    evaluations.value = wordleState.evaluations;
    rowCounter.value = wordleState.rowCounter;
    wordObject.value = wordleState.wordObject;
    return;
  }

  axios
    .request(options)
    .then(function (response) {
      localStorage.setItem(
        "wordleState",
        JSON.stringify({
          wordObject: wordObject.value,
          evaluations: evaluations.value,
          rowCounter: rowCounter.value,
          solution: response.data,
        })
      );
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

let evaluations = ref({
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

    solutionComparison(wordObjectKeyValue);
    rowCounter.value++;
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

function solutionComparison(guessedWord) {
  const solution = JSON.parse(localStorage.getItem("wordleState"))
    .solution.split("")
    .map((word) => {
      return word.toUpperCase();
    });

  guessedWord.forEach((word, index) => {
    if (word === solution[index]) {
      evaluations.value[rowCounter.value].push("correct");
      return;
    }
    if (solution.includes(word)) {
      evaluations.value[rowCounter.value].push("present");
      return;
    }
    evaluations.value[rowCounter.value].push("absent");
  });

  localStorage.wordleState = JSON.stringify({
    solution: JSON.parse(localStorage.getItem("wordleState")).solution,
    wordObject: wordObject.value,
    evaluations: evaluations.value,
    rowCounter: rowCounter.value + 1,
  });
}
</script>
