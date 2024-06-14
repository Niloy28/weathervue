<template>
  <p class="text-md whitespace-nowrap">
    {{ dayjs(time).format('h A') }}
  </p>
  <img
    class="h-[50px] w-auto object-cover"
    :src="`https://openweathermap.org/img/wn/${icon}@2x.png`"
  />
  <p class="text-xl">{{ Math.round(temp) }}&degC</p>
</template>

<script setup>
import dayjs from '../../utils/dayjs'

defineProps({
  time: Object,
  icon: String,
  temp: Number,
})
</script>
