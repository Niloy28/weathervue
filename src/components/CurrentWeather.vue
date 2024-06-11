<template>
  <!-- Weather View -->
  <div class="m-2 mb-10 flex items-center justify-around text-white">
    <div class="flex flex-col items-start">
      <h3 class="text-2xl">{{ cityName }}</h3>
      <h5 class="text-xl">
        {{
          dayjs(currentWeather.localTime).format(
            'dddd[,] Do MMMM[,] YYYY[,] hh:mma'
          )
        }}
      </h5>
      <p class="mt-2 text-5xl font-bold">
        {{ Math.round(currentWeather.temp) }}°C
      </p>
      <p class="my-1">
        Feels like {{ Math.round(currentWeather.feels_like) }}°C
      </p>
      <p class="capitalize">
        {{ currentWeather.weather[0].description }}
      </p>
    </div>
    <img
      class="h-auto w-40"
      :src="`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`"
      alt="weather icon"
    />
  </div>
</template>

<script setup>
import dayjs from '../../utils/dayjs'

defineProps({
  currentWeather: Object,
  cityName: String,
})
</script>
