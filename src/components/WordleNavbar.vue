<template>
  <div
    class="border-b flex border-b-gray-500 border-opacity-50 w-full py-2 px-4 gap-4 items-center justify-end"
  >
    <p v-if="showSolution" class="text-white text-center w-full pl-4 absolute">
      Solution: {{ solution }}
    </p>
    <b-tooltip
      label="Want to check the solution? Click here"
      always
      multilined
      :active="showHelpTooltip"
      position="is-bottom"
      size="is-small"
    >
      <i
        class="cursor-pointer text-2xl text-light-800 z-40 mdi mdi-cog"
        @click="openSettingsModal = true"
      ></i>
    </b-tooltip>
    <i
      class="cursor-pointer text-2xl text-light-800 z-40 mdi mdi-help-circle-outline"
      @click="openHelpModal = true"
    ></i>

    <b-modal v-model="openHelpModal">
      <SettingsModal title="How to play ?">
        <template #content>
          <div class="border-b border-b-gray-500 border-opacity-50 w-full py-4">
            <p class="text-xl text-center text-light-500">
              Wordle is a game where you have to guess a 5 letters word. During
              each game, you have 6 tries to guess the word. Each game is reset
              every 12 hours with a new word to guess.
            </p>
          </div>
          <div
            class="border-b flex flex-col border-b-gray-500 border-opacity-50 w-full py-4 gap-5 justify-center items-center"
          >
            <p class="text-lg text-center text-light-800">
              If a letter is
              <span class="text-lg text-yellow-500">yellow</span> that means
              that it is the right letter at the wrong place
            </p>
            <TableRow
              :key-array="['E', 'N', 'T', 'R', 'Y']"
              :evaluations="['absent', 'present', 'absent', 'absent', 'absent']"
              :tutorial="true"
            />
          </div>
          <div
            class="border-b flex flex-col border-b-gray-500 border-opacity-50 w-full py-4 gap-5 justify-center items-center"
          >
            <p class="text-lg text-center text-light-800">
              If a letter is
              <span class="text-lg text-gray-500">gray</span> that means that it
              is the wrong letter at the wrong place
            </p>
            <TableRow
              :key-array="['E', 'N', 'T', 'R', 'Y']"
              :evaluations="['absent', 'absent', 'absent', 'absent', 'absent']"
              :tutorial="true"
            />
          </div>
          <div
            class="border-b flex flex-col border-b-gray-500 border-opacity-50 w-full py-4 gap-5 justify-center items-center"
          >
            <p class="text-lg text-center text-light-800">
              If a letter is
              <span class="text-lg text-green-500">green</span> that means that
              it is the right letter at the right place
            </p>
            <TableRow
              :key-array="['E', 'N', 'T', 'R', 'Y']"
              :evaluations="['absent', 'correct', 'absent', 'absent', 'absent']"
              :tutorial="true"
            />
          </div>
        </template>
      </SettingsModal>
    </b-modal>
    <b-modal v-model="openSettingsModal">
      <SettingsModal
        title="Settings"
        screen="settings"
        @toggle="showSolution = $event"
      />
    </b-modal>
  </div>
</template>

<script setup>
import "@mdi/font/css/materialdesignicons.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Vue, { onMounted, ref } from "vue";
import SettingsModal from "./SettingsModal.vue";
import TableRow from "./TableRow.vue";

Vue.use(Buefy);

const openHelpModal = ref(false);
const openSettingsModal = ref(false);
const showSolution = ref(false);

const showHelpTooltip = ref(true);

const solution = ref("");

onMounted(() => {
  setTimeout(() => {
    const debugModeState = JSON.parse(
      localStorage.getItem("wordleState")
    ).debugMode;
    if (debugModeState) showSolution.value = true;
    solution.value = JSON.parse(localStorage.getItem("wordleState")).solution;
  }, 1000);

  setTimeout(() => {
    showHelpTooltip.value = false;
  }, 3000);
});
</script>
