<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex flex-1 items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Weather Vue</p>
        </div>
      </RouterLink>

      <div class="flex flex-1 items-center justify-end gap-3">
        <i
          class="fa-solid fa-circle-info cursor-pointer duration-150 hover:text-weather-secondary"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus cursor-pointer text-xl duration-150 hover:text-weather-secondary"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="mb-1 text-2xl">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="mb-4 list-inside list-decimal">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import BaseModal from './BaseModal.vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const SAVED_CITIES_REF = 'savedCities'
const modalActive = ref(null)
const savedCities = ref([])
const route = useRoute()
const router = useRouter()

const toggleModal = () => {
  modalActive.value = !modalActive.value
}

const addCity = () => {
  const storage = localStorage.getItem(SAVED_CITIES_REF)
  if (storage) {
    savedCities.value = JSON.parse(storage)
  }

  const locationObj = {
    id: uuidv4(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  }

  savedCities.value.push(locationObj)
  localStorage.setItem(SAVED_CITIES_REF, JSON.stringify(savedCities.value))

  let newQuery = { ...route.query }
  delete newQuery.preview

  router.replace({ query: newQuery })
}
</script>
