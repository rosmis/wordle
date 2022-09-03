<template>
  <div class="rounded-md m-auto max-w-screen-sm bg-gray-700 py-5">
    <div class="flex flex-col items-center">
      <h2 class="font-bold text-center mb-4 text-2xl text-light-800">
        {{ title }}
      </h2>
      <div
        class="border-b flex border-b-gray-500 border-opacity-50 w-full py-4 gap-10 justify-center items-center"
      >
        <h3 class="text-xl text-center text-light-800">Debug Mode</h3>
        <b-switch v-model="isDebugMode" type="is-success"></b-switch>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

defineProps({
  title: String,
});

const isDebugMode = ref(false);

onMounted(() => {
  const debugModeState = JSON.parse(
    localStorage.getItem("wordleState")
  ).debugMode;

  if (debugModeState) isDebugMode.value = true;

  // if(isDebugMode)
});
</script>
