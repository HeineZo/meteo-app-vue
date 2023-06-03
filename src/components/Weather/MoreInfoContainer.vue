<script setup>
import MoreInfo from './MoreInfo.vue';
import { format, fromUnixTime } from 'date-fns'
import { reactive, watch } from 'vue';
import { useWeatherDataStore } from '@/stores/weatherData';
import { storeToRefs } from 'pinia';

const weather = useWeatherDataStore();
const { currentWeather } = storeToRefs(weather);

const infoList = reactive([
	{
		name: 'Vent',
		value: `${currentWeather?.value?.wind?.speed?.toFixed(0)} km/h`,
		icon: 'compass',
		degree: currentWeather?.value?.wind?.deg,
	},
	{ name: 'Humidité', value: `${currentWeather?.value?.humidity}%`, icon: 'tint' },
	{ 
		icon: 'sun', 
		name: currentWeather?.value?.sun?.sunset < Date.now() ? 'Coucher du soleil' : 'Lever du soleil', 
		value: currentWeather?.value?.sun?.sunset < Date.now() ? format(fromUnixTime(currentWeather?.value?.sun?.sunset ?? 0), "HH'h'mm") : format(fromUnixTime(currentWeather?.value?.sun?.sunrise ?? 0), "HH'h'mm") 
	}
]);

watch(currentWeather.value, (newWeather) => {
	infoList[0].value = `${newWeather.wind.speed.toFixed(0)} km/h`;
	infoList[0].degree = newWeather.degree;
	infoList[1].value = `${newWeather.humidity}%`;

	if (newWeather.sun.sunset < Date.now()) {
		infoList[2].name = 'Coucher du soleil';
		infoList[2].value = format(fromUnixTime(newWeather.sun.sunset), "HH'h'mm");
	} else {
		infoList[2].name = 'Lever du soleil';
		infoList[2].value = format(fromUnixTime(newWeather.sun.sunrise), "HH'h'mm");
	}
});


</script>

<template>
	<main class="flex items-center sm:justify-center w-full h-60 gap-5 overflow-x-auto overflow-y-hidden snap-x snap-proximity whitespace-nowrap px-5 scroll-px-5">
		<MoreInfo v-for="info in infoList" :name="info.name" :value="info.value" :icon="info.icon" :degree="info.degree"
			:img="info.img" />
	</main>
</template>
