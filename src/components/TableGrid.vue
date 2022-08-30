<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <TableRow :key-input="props.keyInput" />
    <TableRow />
    <TableRow />
    <TableRow />
    <TableRow />
    <TableRow />
  </div>
</template>

<script setup>
import TableRow from "./TableRow.vue";

const props = defineProps({
  keyInput: String,
});
</script>
