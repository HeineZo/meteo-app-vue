<script setup>
import MainInfo from '../components/Weather/MainInfo.vue';
import MoreInfoContainer from '../components/Weather/MoreInfoContainer.vue';
import WeeklyWeatherContainer from '../components/Weather/WeeklyWeatherContainer.vue';
import { useWeatherDataStore } from '@/stores/weatherData';
import { storeToRefs } from 'pinia';

const weather = useWeatherDataStore();

</script>

<template>
  <main class="w-full flex items-center justify-center flex-col px-5 relative">
    <RouterLink to="/" class="absolute top-0 left-10 hidden gap-2 items-center cursor-pointer group sm:flex">
      <font-awesome-icon icon="fa-chevron-left" class="group-hover:-translate-x-1" />
      <h3 class="font-bold">Retour</h3>
    </RouterLink>
    <span class="flex gap-5 items-center">
      <RouterLink to="/" class="mt-2 cursor-pointer sm:hidden flex">
        <font-awesome-icon icon="fa-chevron-left" class="hover:-translate-x-1 text-2xl " />
      </RouterLink>
      <h1 class="text-4xl font-bold">Cette semaine</h1>
    </span>
    <MainInfo orientation="horizontal" cityName="Demain"/>
    <MoreInfoContainer />
    <WeeklyWeatherContainer />
  </main>
</template>
