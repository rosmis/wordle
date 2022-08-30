<template>
  <div class="border border-gray-500 h-10 w-10">{{ letter }}</div>
</template>

<script setup>
defineProps({
  letter: String,
});
</script>
