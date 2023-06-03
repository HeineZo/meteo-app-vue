<script setup>
import { useWeatherDataStore } from "@/stores/weatherData";
import { storeToRefs } from "pinia";

const weather = useWeatherDataStore();

const { currentWeather, selectedDay, weatherDataWeeklyArray, loading } = storeToRefs(weather);

defineProps(['cityName', 'temperature', 'description', 'orientation'])
</script>

<template>
  <div v-if="loading">
    <i id="loading-icon" class="fa-solid fa-circle-notch animate-spin text-xl text-primary-500"></i>
  </div>
  <div v-else>
    <main class="flex items-center justify-center gap-10" v-if="orientation === 'horizontal'">
      <img width="200" class="my-5"
        :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${weather.iconCodeToEmoji(currentWeather.weatherArray.icon)}.svg`" />
      <div>
        <h1 class="text-4xl">{{ currentWeather.cityName }}</h1>
        <h1 class="text-7xl text-black font-bold">{{ currentWeather.temperature }}°</h1>
        <h2 class="text-2xl text-gray-400 first-letter:uppercase">{{ currentWeather.weatherArray.description }}</h2>
      </div>
    </main>
    <main class="flex items-center w-full flex-col" v-else>
      <h1 class="text-4xl">{{ currentWeather.cityName }}</h1>
      <img width="200" class="my-5"
        :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${weather.iconCodeToEmoji(currentWeather.weatherArray.icon)}.svg`" />
      <h1 class="text-7xl text-black font-bold">{{ currentWeather.temperature }}°</h1>
      <h2 class="text-2xl text-gray-400 first-letter:uppercase">{{ currentWeather.weatherArray.description }}</h2>
    </main>
  </div>
</template>
