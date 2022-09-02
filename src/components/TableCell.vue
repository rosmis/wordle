<template>
  <div
    class="border border-gray-500 h-10 w-10"
    :class="{
      'bg-gray-300': evaluationLetter === 'absent',
      'bg-yellow-300': evaluationLetter === 'present',
      'bg-green-300': evaluationLetter === 'correct',
    }"
  >
    {{ letter }}
  </div>
</template>

<script setup>
defineProps({
  letter: String,
  evaluationLetter: String,
});
</script>
