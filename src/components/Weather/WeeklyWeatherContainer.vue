<script setup>
import WeeklyWeather from './WeeklyWeather.vue';
const infoList = [
    {day: "Lun", icon: "sun", weather: "Ensoleillé", temperature: 23},
    {day: "Mar", icon: "cloud", weather: "Nuageux", temperature: 18},
    {day: "Mer", icon: "cloud", weather: "Nuageux", temperature: 12},
    {day: "Jeu", icon: "sun", weather: "Ensoleillé", temperature: 30},
    {day: "Ven", icon: "cloud", weather: "Nuageux", temperature: 25},
    {day: "Sam", icon: "cloud", weather: "Nuageux", temperature: 15},
    {day: "Dim", icon: "cloud", weather: "Nuageux", temperature: 10},
    ]
</script>

<template>
    <main class="flex flex-col w-1/2 gap-5 my-10">
        <WeeklyWeather v-for="(info, index) in infoList" :day="info.day" :icon="info.icon" :weather="info.weather" :temperature="info.temperature" :index="index"/>
    </main>
</template>
