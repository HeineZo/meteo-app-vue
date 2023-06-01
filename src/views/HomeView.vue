<script setup>
import MainInfo from '../components/Weather/MainInfo.vue';
import MoreInfoContainer from '../components/Weather/MoreInfoContainer.vue';
import DayContainer from '../components/HomeView/DayContainer.vue';
import { useWeatherDataStore } from "@/stores/weatherData";
import { storeToRefs } from "pinia";

const weather = useWeatherDataStore();

const { loadedOnce } = storeToRefs(weather);

</script>

<template>
  <main v-if=loadedOnce class="w-full min-h-full flex items-center justify-center flex-col gap-10 px-5">
    <MainInfo title="Météo" icon="sun" degrees="20" weather="Ensoleillé" />
    <MoreInfoContainer />
    <DayContainer />
  </main>
  <main v-else class="w-full px-5 flex items-center justify-center">
    <div class="h-full w-1/2 flex flex-col justify-center items-center relative">
      <img width="300"
        src="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/sun.svg" />
      <img width="300" class="absolute left-px bottom-1/4"
        src="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/cloud.svg" />
      <img width="300" class="absolute right-0.5 top-1/4"
        src="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/cloud.svg" />
    </div>
    <div class="h-full flex flex-col justify-center items-center gap-10">
      <h1 class="font-black text-9xl uppercase text-center text-black">Météo du jour</h1>
      <h2 class="font-semibold text-3xl text-gray-400">Recherchez une ville ou utilisez votre position</h2>
    </div>
  </main>
</template>
