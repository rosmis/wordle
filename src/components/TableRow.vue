<template>
  <div class="flex gap-4 items-center relative">
    <TableCell :letter="wordSplitter(0)" :evaluation-letter="evaluations[0]" />
    <TableCell :letter="wordSplitter(1)" :evaluation-letter="evaluations[1]" />
    <TableCell :letter="wordSplitter(2)" :evaluation-letter="evaluations[2]" />
    <TableCell :letter="wordSplitter(3)" :evaluation-letter="evaluations[3]" />
    <TableCell :letter="wordSplitter(4)" :evaluation-letter="evaluations[4]" />
    <i
      v-if="showReturnKey"
      class="cursor-pointer text-2xl text-green-700 text-light-800 z-40 return-key mdi mdi-keyboard-return"
      @click="
        $emit('enter');
        showReturnKey = false;
      "
    ></i>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import TableCell from "./TableCell.vue";

const props = defineProps({
  keyArray: Array,
  evaluations: Array,
  rowCounter: Number,
});

const showReturnKey = ref(false);

watch(
  () => [props.keyArray, props.evaluations],
  () => {
    if (props.keyArray.length === 5 && !props.evaluations.length) {
      showReturnKey.value = true;
      return;
    }
    showReturnKey.value = false;
  },
  { deep: true }
);

function wordSplitter(index) {
  if (!props.keyArray) return;
  return props.keyArray[index];
}
</script>

<style scoped>
.return-key {
  position: absolute;
  left: 103%;
  animation: enter 0.3s ease-in-out;
}

@keyframes enter {
  0% {
    top: 50%;
    opacity: 0;
  }

  50% {
    top: 30%;
    opacity: 0.5;
  }
  75% {
    top: 20%;
    opacity: 0.5;
  }

  100% {
    top: inherit;
    opacity: 1;
  }
}
</style>
