<template>
  <div
    class="border-b flex border-b-gray-500 border-opacity-50 w-full py-2 px-4 gap-4 justify-end"
  >
    <i
      class="cursor-pointer text-2xl text-light-800 mdi mdi-help-circle-outline"
      @click="openHelpModal = true"
    ></i>
    <i
      class="cursor-pointer text-2xl text-light-800 mdi mdi-cog"
      @click="openSettingsModal = true"
    ></i>

    <b-modal v-model="openHelpModal">
      <SettingsModal title="How to play" />
    </b-modal>
    <b-modal v-model="openSettingsModal">
      <SettingsModal title="Settings" />
    </b-modal>
  </div>
</template>

<script setup>
import "@mdi/font/css/materialdesignicons.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Vue, { ref } from "vue";
import SettingsModal from "./SettingsModal.vue";

Vue.use(Buefy);

const openHelpModal = ref(false);
const openSettingsModal = ref(false);
</script>
