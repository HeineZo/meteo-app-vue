<script setup>
import { useWeatherDataStore } from "@/stores/weatherData";
import { storeToRefs } from "pinia";

const weather = useWeatherDataStore();

const { cityName, weatherDescription, weatherIcon, temperature } = storeToRefs(weather);


defineProps(['orientation'])
</script>

<template>
  <main class="flex items-center justify-center gap-10 w-1/2" v-if="orientation === 'horizontal'">
    <img width="200" class="my-5"
      :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${weather.iconCodeToEmoji(weatherIcon)}.svg`" />
    <div>
      <h1 class="text-4xl">{{ cityName }}</h1>
      <h1 class="text-7xl text-black font-bold">{{ temperature }}°</h1>
      <h2 class="text-2xl text-gray-400 first-letter:uppercase">{{ weatherDescription }}</h2>
    </div>
  </main>
  <main class="flex items-center w-full flex-col" v-else>
    <h1 class="text-4xl">{{ cityName }}</h1>
    <img width="200" class="my-5"
      :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${weather.iconCodeToEmoji(weatherIcon)}.svg`" />
    <h1 class="text-7xl text-black font-bold">{{ temperature }}°</h1>
    <h2 class="text-2xl text-gray-400 first-letter:uppercase">{{ weatherDescription }}</h2>
  </main>
</template>
