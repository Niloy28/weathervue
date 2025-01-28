<template>
  <div class="relative mb-8 pt-4">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a city"
      class="w-full border-b bg-transparent px-4 py-2 focus:border-weather-secondary focus:shadow-[0px_1px_0_0_#004E71] focus:outline-none"
      name="location-search"
      id="location-search"
      @input="
        () => {
          getSearchResults()
          fetchedLocations = null
        }
      "
    />
    <ul
      v-if="fetchedLocations"
      class="absolute top-[66px] w-full bg-weather-secondary p-2 text-white shadow-md"
    >
      <p v-if="searchError">
        Sorry, an error occurred while searching for the location. Please try
        again later.
      </p>
      <p
        v-if="!searchError && fetchedLocations && fetchedLocations.length == 0"
      >
        No matching locations found.
      </p>
      <template v-else>
        <li
          v-for="fetchedLocation in fetchedLocations"
          :key="fetchedLocation.lat"
          class="cursor-pointer px-1 py-2"
          @click="previewWeather(fetchedLocation)"
        >
          {{ fetchedLocation.name }}, {{ fetchedLocation.state }},
          {{ fetchedLocation.country }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const queryTimeout = ref(null)
const fetchedLocations = ref(null)
const searchError = ref(null)

const router = useRouter()

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        fetchedLocations.value = await fetchLocations()
        searchError.value = null
      } catch (error) {
        console.error(error)

        searchError.value = error
      }
    } else {
      fetchLocations.value = null
    }
  }, 300)
}

const fetchLocations = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_OPENWEATHER_GEOCODING_BASE_URL}?q=${
      searchQuery.value
    }&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
  )

  return response.data
}

const previewWeather = (location) => {
  const [city, state, country] = [
    location.name,
    location.state,
    location.country,
  ]

  router.push({
    name: 'weatherView',
    params: {
      country: country.trim(),
      state: state.trim(),
      city: city.trim(),
    },
    query: {
      lon: location.lon,
      lat: location.lat,
      preview: true,
    },
  })
}
</script>
