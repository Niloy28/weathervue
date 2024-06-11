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

    <!-- Weather View -->
    <div class="m-2 flex items-center justify-around text-white">
      <div class="flex flex-col items-start">
        <h3 class="text-2xl">{{ route.params.city }}</h3>
        <h5 class="text-xl">
          {{
            dayjs(weatherData.current.localTime).format(
              'dddd[,] Do MMMM[,] YYYY[,] hh:mma'
            )
          }}
        </h5>
        <p class="mt-2 text-5xl font-bold">
          {{ Math.round(weatherData.current.temp) }}°C
        </p>
        <p class="my-1">
          Feels like {{ Math.round(weatherData.current.feels_like) }}°C
        </p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
      </div>
      <img
        class="h-auto w-40"
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt="weather icon"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import dayjs from '../../utils/dayjs'
import { useRoute } from 'vue-router'

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
