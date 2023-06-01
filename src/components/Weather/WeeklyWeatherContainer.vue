<script setup>
import WeeklyWeather from './WeeklyWeather.vue';
import { useWeatherDataStore } from '@/stores/weatherData';
import { storeToRefs } from 'pinia';

const weather = useWeatherDataStore();

const { weatherDataWeeklyArray } = storeToRefs(weather);

</script>

<template>
    <main class="flex flex-col w-1/2 min-w-fit gap-5 my-10">
        <WeeklyWeather v-for="weekday in weatherDataWeeklyArray" :day="weekday.day"
            :icon="weather.iconCodeToEmoji(weekday.icon)" :description="weekday.description" :temp="weekday.temp" />
    </main>
</template>
