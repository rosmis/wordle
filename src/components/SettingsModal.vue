<template>
  <div class="rounded-md m-auto max-w-screen-sm bg-gray-700 py-5">
    <h2 class="text-xl text-center text-light-800">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
