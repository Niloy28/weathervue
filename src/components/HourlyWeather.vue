<template>
  <div class="w-full max-w-screen-md py-12">
    <div class="mx-8 text-white">
      <h2 class="mb-4 text-2xl">Hourly Weather</h2>
      <div class="flex gap-10 overflow-x-scroll">
        <div
          v-for="hourlyData in hourlyWeather"
          :key="hourlyData.dt"
          class="flex flex-col items-center gap-4"
        >
          <HourlyWeatherCard
            :time="hourlyData.localTime"
            :icon="hourlyData.weather[0].icon"
            :temp="hourlyData.temp"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HourlyWeatherCard from './HourlyWeatherCard.vue'

defineProps({
  hourlyWeather: Array(Object),
})
</script>
