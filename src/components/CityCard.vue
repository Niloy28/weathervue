<template>
  <div
    class="flex cursor-pointer rounded-md bg-weather-tertiary px-3 py-6 shadow-md"
  >
    <div class="flex flex-1 flex-col self-center">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3 class="flex gap-1">
        <div v-if="city.state">{{ city.state }},</div>
        <div>{{ city.country }}</div>
      </h3>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-center gap-2">
        <p class="text-3xl">{{ Math.round(city.weather.main.temp) }}&deg;</p>
        <img
          height="60px"
          width="60px"
          :src="`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
          alt="weather icon"
        />
      </div>
      <div class="flex gap-2">
        <span class="text-xs"
          >High: {{ Math.round(city.weather.main.temp_max) }}&deg;</span
        >
        <span class="text-xs"
          >Low: {{ Math.round(city.weather.main.temp_min) }}&deg;</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
})
</script>
