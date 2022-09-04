<template>
  <div
    class="border-b flex border-b-gray-500 border-opacity-50 w-full py-2 px-4 gap-4 items-center justify-end"
  >
    <p v-if="showSolution" class="text-white text-center w-full pl-4 absolute">
      Solution: {{ solution }}
    </p>
    <i
      class="cursor-pointer text-2xl text-light-800 z-40 mdi mdi-help-circle-outline"
      @click="openHelpModal = true"
    ></i>
    <i
      class="cursor-pointer text-2xl text-light-800 z-40 mdi mdi-cog"
      @click="openSettingsModal = true"
    ></i>

    <b-modal v-model="openHelpModal">
      <SettingsModal title="How to play ?" />
    </b-modal>
    <b-modal v-model="openSettingsModal">
      <SettingsModal title="Settings" @toggle="showSolution = $event" />
    </b-modal>
  </div>
</template>

<script setup>
import "@mdi/font/css/materialdesignicons.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Vue, { onMounted, ref } from "vue";
import SettingsModal from "./SettingsModal.vue";

Vue.use(Buefy);

const openHelpModal = ref(false);
const openSettingsModal = ref(false);
const showSolution = ref(false);

const solution = ref("");

onMounted(() => {
  const debugModeState = JSON.parse(
    localStorage.getItem("wordleState")
  ).debugMode;
  if (debugModeState) showSolution.value = true;
  solution.value = JSON.parse(localStorage.getItem("wordleState")).solution;
});
</script>