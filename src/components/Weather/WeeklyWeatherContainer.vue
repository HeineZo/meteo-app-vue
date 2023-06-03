<script setup>
import WeeklyWeather from './WeeklyWeather.vue';
import { useWeatherDataStore } from '@/stores/weatherData';
import { storeToRefs } from 'pinia';
import { watch, reactive } from 'vue';

const weather = useWeatherDataStore();

const { weatherDataWeekly, weatherDataWeeklyArray, selectedDay } = storeToRefs(weather);




</script>

<template>
    <main class="flex flex-col w-1/2 min-w-fit gap-5 my-10">
        <WeeklyWeather v-for="(weekday, index) in weatherDataWeekly" @click.native="selectedDay.index = index" :day="weekday.day"
            :icon="weather.iconCodeToEmoji(weekday.icon)" :description="weekday.description" :temp="weekday.temp"
            :selected="index === selectedDay.index" />
    </main>
</template>
