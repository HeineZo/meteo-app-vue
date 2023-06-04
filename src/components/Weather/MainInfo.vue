<script setup>
import { useWeatherDataStore } from "@/stores/weatherData";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const weather = useWeatherDataStore();

const { weatherDataWeekly, loading } = storeToRefs(weather);

defineProps(['orientation', 'selectedDay'])
</script>

<template>
  <div v-if="loading === true">
    <i id="loading-icon" class="fa-solid fa-circle-notch animate-spin text-xl text-primary-500"></i>
  </div>
  <div v-else>
    <main class="flex items-center justify-center gap-10" v-if="orientation === 'horizontal'">
      <img width="200" class="my-5"
        :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${weather.iconCodeToEmoji(weatherDataWeekly[selectedDay].icon)}.svg`" />
      <div>
        <h1 class="text-4xl">{{ weatherDataWeekly[selectedDay].cityName }}</h1>
        <h1 class="text-7xl text-black font-bold">{{ weatherDataWeekly[selectedDay].temp }}°</h1>
        <h2 class="text-2xl text-gray-400 first-letter:uppercase">{{ weatherDataWeekly[selectedDay].description }}</h2>
      </div>
    </main>
    <main class="flex items-center w-full flex-col" v-else>
      <h1 class="text-4xl">{{ weatherDataWeekly[selectedDay].cityName }}</h1>
      <img width="200" class="my-5"
        :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${weather.iconCodeToEmoji(weatherDataWeekly[0].icon)}.svg`" />
      <h1 class="text-7xl text-black font-bold">{{ weatherDataWeekly[selectedDay].temp }}°</h1>
      <h2 class="text-2xl text-gray-400 first-letter:uppercase">{{ weatherDataWeekly[selectedDay].description }}</h2>
    </main>
  </div>
</template>
