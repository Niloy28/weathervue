<template>
  <div>
    <Suspense>
      <AsyncWeatherView />

      <template #fallback>
        <p class="container text-center text-4xl font-bold text-white">
          Loading...
        </p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncWeatherView from './AsyncWeatherView.vue'
</script>
