<template>
  <div class="flex gap-4">
    <TableCell :letter="wordSplitter(0)" />
    <TableCell :letter="wordSplitter(1)" />
    <TableCell :letter="wordSplitter(2)" />
    <TableCell :letter="wordSplitter(3)" />
    <TableCell :letter="wordSplitter(4)" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import TableCell from "./TableCell.vue";

const props = defineProps({
  keyInput: String,
});

const word = ref([]);

watch(
  () => props.keyInput,
  () => {
    wordChecker(props.keyInput);
  }
);

function wordChecker(letter) {
  if (word.value.length > 4) return;
  if (letter) {
    word.value.push(letter);
  }
}

function wordSplitter(split) {
  return word.value[split];
}
</script>
