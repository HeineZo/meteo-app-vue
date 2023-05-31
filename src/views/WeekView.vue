<script setup>
import MainInfo from '../components/Weather/MainInfo.vue';
import MoreInfoContainer from '../components/Weather/MoreInfoContainer.vue';
import WeeklyWeatherContainer from '../components/Weather/WeeklyWeatherContainer.vue';
</script>

<template>
  <main class="w-full flex items-center justify-center flex-col gap-10 px-5">
    <span class="flex gap-5 items-center">
      <!-- <font-awesome-icon icon="fa-solid fa-chevron-circle-left" class="text-3xl" /> -->
      <h1 class="text-4xl font-bold">Cette semaine</h1>
    </span>
    <MainInfo title="Demain" icon="sun" degrees="20" weather="Ensoleillé" orientation="horizontal"/>
    <MoreInfoContainer />
    <WeeklyWeatherContainer />
  </main>
</template>
