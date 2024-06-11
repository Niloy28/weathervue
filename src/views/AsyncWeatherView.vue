<template>
  <div class="flex flex-1 flex-col items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="w-full bg-weather-secondary p-4 text-center font-bold text-white"
    >
      <p>
        You are currently previewing this city, press the + icon to add this to
        your list.
      </p>
    </div>

    <CurrentWeather
      :city-name="route.params.city"
      :current-weather="weatherData.current"
    />

    <hr class="w-full border border-white border-opacity-20" />

    <div class="w-full max-w-screen-md py-12"></div>
  </div>
</template>

<script setup>
import axios from 'axios'
import dayjs from '../../utils/dayjs'
import { useRoute } from 'vue-router'
import CurrentWeather from '@/components/CurrentWeather.vue'

const route = useRoute()

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${
        route.query.lat
      }&lon=${route.query.lon}&exclude=minutely&appid=${
        import.meta.env.VITE_OPENWEATHER_API_KEY
      }&units=metric`
    )

    // get timezone offset in ms
    const timezoneOffset = weatherData.data.timezone_offset * 1000
    weatherData.data.current.localTime = dayjs.unix(1718001519).format()

    weatherData.data.hourly.forEach((hour) => {
      hour.localTime = dayjs(hour.dt + timezoneOffset).format()
    })

    return weatherData.data
  } catch (error) {
    console.error(error)
  }
}

const weatherData = await getWeatherData()
</script>
