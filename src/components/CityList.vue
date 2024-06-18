<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToWeatherView(city)" />
  </div>

  <p v-if="savedCities.length === 0">No locations have been added.</p>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import CityCard from './CityCard.vue'
import { useRouter } from 'vue-router'

const SAVED_CITIES_REF = 'savedCities'
const savedCities = ref([])
const router = useRouter()

const getCities = async () => {
  const storedCities = localStorage.getItem(SAVED_CITIES_REF)

  if (storedCities) {
    savedCities.value = JSON.parse(storedCities)
  }

  const requests = []

  savedCities.value.forEach((savedCity) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${savedCity.coords.lat}&lon=${savedCity.coords.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
      )
    )
  })

  const weatherData = await Promise.all(requests)

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data
  })
}

const goToWeatherView = (city) => {
  router.push({
    name: 'weatherView',
    params: {
      country: city.country,
      state: city.state,
      city: city.city,
    },
    query: {
      lon: city.coords.lon,
      lat: city.coords.lat,
    },
  })
}

await getCities()
</script>
