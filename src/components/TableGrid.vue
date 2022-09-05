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
  </div>
</template>

<script setup>
import axios from "axios";
import moment from "moment";
import { computed, onMounted, ref, watch } from "vue";
import { options } from "./axios_params";
import TableRow from "./TableRow.vue";

// window.localStorage.clear();

const props = defineProps({
  keyInputObject: Object,
});

const emit = defineEmits(["timer", "isGameWon", "isGameLost"]);

const isGameWon = ref(false);
const rowCounter = ref(1);

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
    timeNextWordleChecker();

    return;
  }

  axiosWordRequest();
});

function axiosWordRequest() {
  if (localStorage.wordleState) {
    window.localStorage.clear();
    // reset default values
    (wordObject.value = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    }),
      (evaluations.value = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      }),
      (rowCounter.value = 1);
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
          startingStamp: moment().format(),
        })
      );
    })
    .catch(function (error) {
      console.error(error);
    });

  timeNextWordleChecker();
}

function timeNextWordleChecker() {
  setTimeout(() => {
    const dateNextWordle = moment(
      JSON.parse(localStorage.getItem("wordleState")).startingStamp
    )
      .add(12, "hours")
      .format();

    const currentTime = moment();

    // at page reload if current time is after dateNextWordle time trigger axios request
    if (moment(currentTime).isAfter(dateNextWordle)) {
      axiosWordRequest();
    }

    const timeRemaining = ref(
      moment(dateNextWordle).diff(currentTime, "milliseconds")
    );

    const timer = computed(() => {
      return moment.duration(timeRemaining.value);
    });

    setInterval(() => {
      timeRemaining.value = moment(timeRemaining.value).subtract(
        1000,
        "milliseconds"
      );

      emit("timer", timer);
      if (timeRemaining.value <= 0) axiosWordRequest();
    }, 1000);
  }, 1000);
}

watch(
  () => props.keyInputObject,
  () => {
    wordChecker(props.keyInputObject.keyboardInput);
  }
);

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
    startingStamp: JSON.parse(localStorage.getItem("wordleState"))
      .startingStamp,
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
    emit("isGameWon", isGameWon.value);
  }
}
</script>
