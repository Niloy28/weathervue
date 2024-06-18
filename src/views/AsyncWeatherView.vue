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

    <SectionBorder />

    <HourlyWeather :hourly-weather="weatherData.hourly" />

    <SectionBorder />

    <WeeklyWeather :weekly-weather="weatherData.daily" />

    <div
      v-if="!isPreviewRoute()"
      class="flex cursor-pointer items-center gap-2 pb-12 text-white duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash-can"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import dayjs from '../../utils/dayjs'
import { useRoute, useRouter } from 'vue-router'
import CurrentWeather from '@/components/CurrentWeather.vue'
import HourlyWeather from '@/components/HourlyWeather.vue'
import SectionBorder from '../components/SectionBorder.vue'
import WeeklyWeather from '@/components/WeeklyWeather.vue'

const route = useRoute()
const router = useRouter()

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${
        route.query.lat
      }&lon=${route.query.lon}&exclude=minutely&appid=${
        import.meta.env.VITE_OPENWEATHER_API_KEY
      }&units=metric`
    )

    // get timezone
    const timezone = weatherData.data.timezone
    weatherData.data.current.localTime = dayjs(weatherData.data.current.dt).tz(
      timezone
    )

    weatherData.data.hourly.forEach((hour) => {
      hour.localTime = dayjs(hour.dt * 1000).tz(timezone)
    })

    weatherData.data.daily.forEach((day) => {
      day.localTime = dayjs(day.dt * 1000).tz(timezone)
    })

    return weatherData.data
  } catch (error) {
    console.error(error)
  }
}

const removeCity = () => {
  const storage = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_SAVED_CITIES_REF)
  )

  localStorage.setItem(
    import.meta.env.VITE_SAVED_CITIES_REF,
    JSON.stringify(
      storage.filter((savedCity) => savedCity.id !== route.query.id)
    )
  )

  router.push({
    name: 'home',
  })
}

const isPreviewRoute = () => {
  return Object.keys(route.query).includes('preview')
}

const weatherData = await getWeatherData()
</script>
