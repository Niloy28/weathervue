<template>
  <div class="flex flex-1 flex-col items-center">
    <CurrentWeatherSkeleton />

    <SectionBorder />

    <HourlyWeatherSkeleton />

    <SectionBorder />

    <WeeklyWeatherSkeleton />
  </div>
</template>

<script setup>
import CurrentWeatherSkeleton from './CurrentWeatherSkeleton.vue'
import HourlyWeatherSkeleton from './HourlyWeatherSkeleton.vue'
import WeeklyWeatherSkeleton from './WeeklyWeatherSkeleton.vue'
import SectionBorder from './SectionBorder.vue'
</script>
