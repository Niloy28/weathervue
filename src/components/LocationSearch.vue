<template>
	<div class="pt-4 mb-8 relative">
		<input
			type="text"
			v-model="searchQuery"
			placeholder="Search for a city"
			class="py-2 px-4 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
			name="location-search"
			id="location-search"
			@input="
				() => {
					getSearchResults();
					fetchedLocations = null;
				}
			"
		/>
		<ul
			v-if="fetchedLocations"
			class="text-white absolute w-full bg-weather-secondary shadow-md p-2 top-[66px]"
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
					:key="fetchedLocation.id"
					class="cursor-pointer py-2 px-1"
					@click="previewWeather(fetchedLocation)"
				>
					{{ fetchedLocation.place_name }}
				</li>
			</template>
		</ul>
	</div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const queryTimeout = ref(null);
const fetchedLocations = ref(null);
const searchError = ref(null);

const router = useRouter();

const getSearchResults = () => {
	clearTimeout(queryTimeout.value);
	queryTimeout.value = setTimeout(async () => {
		if (searchQuery.value !== "") {
			try {
				fetchedLocations.value = await fetchLocations();
				searchError.value = null;
			} catch (error) {
				console.error(error);

				searchError.value = error;
			}
		} else {
			fetchLocations.value = null;
		}
	}, 300);
};

const fetchLocations = async () => {
	const response = await axios.get(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${
			searchQuery.value
		}.json?access_token=${import.meta.env.VITE_MAPBOX_KEY}&types=place`
	);

	return response.data.features;
};

const previewWeather = (location) => {
	console.log(location);
	const [city, state, country] = location.place_name.split(",");

	router.push({
		name: "weatherView",
		params: {
			country: country.trim(),
			state: state.trim(),
			city: city.trim(),
		},
		query: {
			lon: location.geometry.coordinates[0],
			lat: location.geometry.coordinates[1],
		},
	});
};
</script>
