<script setup>
import Day from './Day.vue';
import { useWeatherDataStore } from '@/stores/weatherData';
import { storeToRefs } from 'pinia';

const weather = useWeatherDataStore();

const { weatherDataHourlyArray } = storeToRefs(weather);

const { iconCodeToEmoji } = weather

const unixToHour = (unix) => {
  const date = new Date(unix * 1000);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

</script>

<template>
  <main class="max-w-xl w-full flex flex-col gap-5 mt-24">
    <div class="flex justify-between items-center">
      <h3 class="font-bold text-xl">Aujourd'hui</h3>
      <RouterLink to="/week" class="flex items-center gap-1 cursor-pointer group">
        <p class="text-gray-400 font-semibold">7 jours</p>
        <img src="../../assets/chevron-right.svg" class="w-2 group-hover:translate-x-1">
      </RouterLink>
    </div>
    <div class="flex gap-5 overflow-x-auto overflow-y-hidden snap-x snap-proximity whitespace-nowrap">
      <Day v-for="hour in weatherDataHourlyArray" :temp="hour.temp.toFixed(0)" :time="unixToHour(hour.time)"
        :icon="iconCodeToEmoji(hour.icon)" />
    </div>
  </main>
</template>
