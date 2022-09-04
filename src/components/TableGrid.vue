<template>
  <div>
    <div class="flex flex-col gap-4 items-center justify-center">
      <TableRow
        v-for="(row, index) in wordObject"
        :key="index"
        :key-array="wordObject[index]"
        :evaluations="evaluations[index]"
      />
    </div>
    <b-modal v-model="isGameWon" :can-cancel="false">
      <SettingsModal title="Game Won !">
        <template #content>
          <div
            class="border-b flex border-b-gray-500 border-opacity-50 w-full py-4 gap-10 justify-center items-center"
          >
            <h3 class="text-xl text-center text-light-800">Number of tries</h3>
            <p class="text-lg text-center text-light-800">
              {{ rowCounter - 1 }}
            </p>
          </div>
        </template>
      </SettingsModal>
    </b-modal>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { options } from "./axios_params.js";
import SettingsModal from "./SettingsModal.vue";
import TableRow from "./TableRow.vue";

// window.localStorage.clear();

const props = defineProps({
  keyInputObject: Object,
});

const isGameWon = ref(false);

onMounted(() => {
  if (localStorage.wordleState) {
    const wordleState = JSON.parse(localStorage.getItem("wordleState"));
    const winningState = JSON.parse(
      localStorage.getItem("wordleState")
    ).winningStatus;
    evaluations.value = wordleState.evaluations;
    rowCounter.value = wordleState.rowCounter;
    wordObject.value = wordleState.wordObject;

    if (winningState) isGameWon.value = true;
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
          debugMode: false,
          winningStatus: false,
        })
      );
    })
    .catch(function (error) {
      console.error(error);
    });
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
  const solutionArray = JSON.parse(localStorage.getItem("wordleState"))
    .solution.split("")
    .map((word) => {
      return word.toUpperCase();
    });

  guessedWord.forEach((word, index) => {
    if (word === solutionArray[index]) {
      evaluations.value[rowCounter.value].push("correct");
      return;
    }
    if (solutionArray.includes(word)) {
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
    debugMode: false,
    winningStatus: false,
  });

  if (
    solutionArray.every(
      (solutionLetter, index) => solutionLetter === guessedWord[index]
    )
  ) {
    localStorage.wordleState = JSON.stringify({
      ...JSON.parse(localStorage.wordleState),
      winningStatus: true,
    });
    isGameWon.value = true;
  }
}
</script>
