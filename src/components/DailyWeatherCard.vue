<template>
  <div class="flex w-full flex-1 justify-between px-2">
    <p class="flex items-center">{{ dayjs(day).format('dddd') }}</p>
    <div class="flex w-1/3 justify-around">
      <img
        class="h-[50px] w-auto object-cover"
        :src="`https://openweathermap.org/img/wn/${icon}@2x.png`"
      />
      <div class="items-center justify-between">
        <p>Low: {{ Math.round(low) }}&degC</p>
        <p>High: {{ Math.round(high) }}&degC</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from '../../utils/dayjs'

defineProps({
  day: Object,
  icon: String,
  low: Number,
  high: Number,
})
</script>
