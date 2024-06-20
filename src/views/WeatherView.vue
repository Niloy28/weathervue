<template>
  <div>
    <Suspense>
      <AsyncWeatherView />

      <template #fallback>
        <WeatherViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import WeatherViewSkeleton from '@/components/WeatherViewSkeleton.vue'
import AsyncWeatherView from './AsyncWeatherView.vue'
</script>
