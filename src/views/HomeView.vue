<template>
  <main class="container text-white">
    <LocationSearch></LocationSearch>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import CityCardSkeleton from '@/components/CityCardSkeleton.vue'
import CityList from '@/components/CityList.vue'
import LocationSearch from '@/components/LocationSearch.vue'
</script>
