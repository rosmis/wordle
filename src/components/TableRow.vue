<template>
  <div class="flex gap-4" @keyup.enter="consoleLog">
    <TableCell :letter="wordSplitter(0)" />
    <TableCell :letter="wordSplitter(1)" />
    <TableCell :letter="wordSplitter(2)" />
    <TableCell :letter="wordSplitter(3)" />
    <TableCell :letter="wordSplitter(4)" />
  </div>
</template>

<script setup>
import TableCell from "./TableCell.vue";

const props = defineProps({
  keyArray: Array,
});

// const wordLength = computed((length) => {
//   if(keyArray.length > length) return true
//   return false
// })

// watch(
//   () => props.keyArray,
//   () => {
//     // console.log(props.keyArray);
//   },
//   { deep: true }
// );

function consoleLog() {
  console.log("test");
}

function wordSplitter(index) {
  if (!props.keyArray) return;
  return props.keyArray[index];
}
</script>
