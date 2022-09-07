<template>
  <div
    class="border flex font-bold border-gray-500 h-12 text-light-800 w-12 items-center justify-center"
    :class="{
      'bg-gray-200 text-gray-500 border-2 border-gray-500':
        evaluationLetter === 'absent',
      'bg-yellow-200 text-gray-500 border-2 border-yellow-500':
        evaluationLetter === 'present',
      'bg-green-200 text-gray-500 border-2 border-green-600':
        evaluationLetter === 'correct',
      'letter-transition': letter,
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

<style scoped>
.letter-transition {
  animation: letter 0.2s cubic-bezier(0.98, 0, 0.16, 1.45);
}
@keyframes letter {
  0% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1.2);
  }

  100% {
    transform: scale(1, 1);
  }
}
</style>
