<template>
  <div class="flex gap-4">
    <TableCell :letter="wordSplitter(0)" :evaluation-letter="evaluations[0]" />
    <TableCell :letter="wordSplitter(1)" :evaluation-letter="evaluations[1]" />
    <TableCell :letter="wordSplitter(2)" :evaluation-letter="evaluations[2]" />
    <TableCell :letter="wordSplitter(3)" :evaluation-letter="evaluations[3]" />
    <TableCell :letter="wordSplitter(4)" :evaluation-letter="evaluations[4]" />
  </div>
</template>

<script setup>
import TableCell from "./TableCell.vue";

const props = defineProps({
  keyArray: Array,
  evaluations: Array,
});

function wordSplitter(index) {
  if (!props.keyArray) return;
  return props.keyArray[index];
}
</script>
