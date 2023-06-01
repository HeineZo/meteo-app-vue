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
  <main class="w-full flex items-center justify-center flex-col gap-10 px-5" v-if=loadedOnce>
      <MainInfo title="Météo" icon="sun" degrees="20" weather="Ensoleillé" />
    <MoreInfoContainer />
    <DayContainer />
  </main>
  <div v-else>
    <h1>Recherchez un emplacement</h1>
  </div>
</template>
