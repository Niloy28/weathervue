<template>
  <div
    class="m-2 mb-10 flex w-2/3 max-w-screen-sm items-center justify-around text-white"
  >
    <div class="flex w-full flex-col items-start gap-2">
      <AnimatedPlaceholder class="w-full max-w-[75px]" />
      <AnimatedPlaceholder class="w-full max-w-[50%]" />
      <AnimatedPlaceholder class="w-full max-w-[50%]" />
      <AnimatedPlaceholder class="w-full max-w-[50%]" />
      <AnimatedPlaceholder class="w-full max-w-[50%]" />
    </div>
    <div class="flex h-[100px] w-full justify-end">
      <AnimatedPlaceholder class="w-full max-w-[50%]" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
