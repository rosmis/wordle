<template>
  <div class="rounded-md m-auto max-w-screen-sm bg-gray-700 p-5">
    <div class="flex flex-col items-center">
      <h2 class="font-bold text-center mb-4 text-2xl text-light-800">
        {{ title }}
      </h2>
      <template v-if="screen === 'settings'">
        <div
          class="border-b flex border-b-gray-500 border-opacity-50 w-full py-4 gap-10 justify-center items-center"
        >
          <h3 class="text-xl text-center text-light-800">Debug Mode</h3>
          <b-switch v-model="isDebugMode" type="is-success"></b-switch>
        </div>
        <div
          class="border-b flex border-b-gray-500 border-opacity-50 w-full py-4 gap-10 justify-center items-center"
        >
          <h3 class="text-lg text-center text-light-800">
            Check out my portfolio !
          </h3>
          <a
            class="text-sm text-gray-400 hover:text-gray-500"
            href="https://bit.ly/rosmis-portfolio"
            >Link to my portfolio</a
          >
        </div>
      </template>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

defineProps({
  title: String,
  screen: String,
});

const emit = defineEmits("toggle");

const isDebugMode = ref(false);

watch(
  () => isDebugMode.value,
  () => {
    if (isDebugMode.value) {
      localStorage.wordleState = JSON.stringify({
        ...JSON.parse(localStorage.wordleState),
        debugMode: true,
      });
      emit("toggle", isDebugMode.value);
      return;
    }

    localStorage.wordleState = JSON.stringify({
      ...JSON.parse(localStorage.wordleState),
      debugMode: false,
    });
    emit("toggle", isDebugMode.value);
  }
);

onMounted(() => {
  const debugModeState = JSON.parse(
    localStorage.getItem("wordleState")
  ).debugMode;
  if (debugModeState) {
    isDebugMode.value = true;
    return;
  }
});
</script>
