<template>
  <div class="w-full max-w-screen-md py-12">
    <div class="mx-8 text-white">
      <h2 class="mb-4 text-2xl">7-Day Weather</h2>
      <div
        class="flex flex-col items-center justify-center gap-8 overflow-x-scroll"
      >
        <div
          v-for="dailyData in weeklyWeather"
          :key="dailyData.dt"
          class="flex w-full flex-col items-center gap-4"
        >
          <DailyWeatherCard
            :day="dailyData.localTime"
            :icon="dailyData.weather[0].icon"
            :low="dailyData.temp.min"
            :high="dailyData.temp.max"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DailyWeatherCard from './DailyWeatherCard.vue'

defineProps({
  weeklyWeather: Array(Object),
})
</script>
