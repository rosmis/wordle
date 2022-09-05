<template>
  <div class="flex flex-col h-screen bg-gray-900 gap-10">
    <WordleHeader />
    <TableGrid
      :key-input-object="keyLog ? keyLog : ''"
      @timer="timerBinding($event)"
      @isGameWon="gameStatus = $event"
    />
    <KeyboardGrid @keystroke="keyLog = $event" />
    <h1>
      {{ moment.duration(timerApp).hours() }}h:{{
        moment.duration(timerApp).minutes()
      }}m:{{ moment.duration(timerApp).seconds() }}s
    </h1>

    <b-modal v-if="isGameWon" v-model="isGameWon" :can-cancel="false">
      <SettingsModal title="Game Won !">
        <template #content>
          <div
            class="border-b flex border-b-gray-500 border-opacity-50 w-full py-4 gap-10 justify-center items-center"
          >
            <h3 class="text-xl text-center text-light-800">Number of tries</h3>
            <p class="text-lg text-center text-light-800">
              {{ rowCounter }}
            </p>
          </div>
          <div
            class="border-b flex flex-col border-b-gray-500 border-opacity-50 w-full py-4 gap-8 justify-center items-center"
          >
            <h3 class="font-bold text-xl text-center text-light-800">
              NEXT WORDLE IN:
            </h3>
            <p class="text-center text-3xl text-light-800">
              {{ moment.duration(timerApp).hours() }}:{{
                moment.duration(timerApp).minutes()
              }}:{{ moment.duration(timerApp).seconds() }}
            </p>
          </div>
        </template>
      </SettingsModal>
    </b-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import KeyboardGrid from "./components/KeyboardGrid.vue";
import SettingsModal from "./components/SettingsModal.vue";
import TableGrid from "./components/TableGrid.vue";
import WordleHeader from "./components/WordleHeader.vue";

let keyLog = ref({});
let gameStatus = ref();

const isGameWon = ref(false);
const timerApp = ref("");
const rowCounter = ref();
function timerBinding(event) {
  timerApp.value = event;
}

onMounted(() => {
  if (localStorage.wordleState) {
    const winningState = JSON.parse(
      localStorage.getItem("wordleState")
    ).winningStatus;
    const rowCount = JSON.parse(localStorage.getItem("wordleState")).rowCounter;

    if (winningState) isGameWon.value = true;
    rowCounter.value = rowCount - 1;
  }
});

watch(
  () => gameStatus.value,
  () => (isGameWon.value = true)
);
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

* {
  font-family: "Poppins", sans-serif;
}
</style>
