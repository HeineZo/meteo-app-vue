<script setup>
import MoreInfo from './MoreInfo.vue';
import { format, fromUnixTime } from 'date-fns'
import { reactive, watch } from 'vue';
import { useWeatherDataStore } from '@/stores/weatherData';
import { storeToRefs } from 'pinia';

const weather = useWeatherDataStore();
const { weatherDataWeekly } = storeToRefs(weather);
const props = defineProps(['selectedDay'])


const infoList = reactive([
	{
		name: 'Vent',
		value: `${weatherDataWeekly?.value[props.selectedDay]?.wind?.speed} km/h`,
		icon: 'compass',
		degree: weatherDataWeekly?.value[props.selectedDay]?.wind?.deg,
	},
	{ name: 'Humidité', value: `${weatherDataWeekly?.value[props.selectedDay]?.humidity}%`, icon: 'tint' },
	{ 
		icon: 'sun', 
		name: weatherDataWeekly?.value[props.selectedDay]?.sun?.sunset < Date.now() ? 'Coucher du soleil' : 'Lever du soleil', 
		value: weatherDataWeekly?.value[props.selectedDay]?.sun?.sunset < Date.now() ? format(fromUnixTime(weatherDataWeekly?.value[props.selectedDay]?.sun?.sunset ?? 0), "HH'h'mm") : format(fromUnixTime(weatherDataWeekly?.value[props.selectedDay]?.sun?.sunrise ?? 0), "HH'h'mm") 
	}
]);

watch(weatherDataWeekly, (newWeather) => {
	updateInfoList(newWeather);
});

watch(props, () => {
	updateInfoList(weatherDataWeekly.value);
});

const updateInfoList = (newWeather) => {
	infoList[0].value = `${newWeather[props.selectedDay].wind.speed} km/h`;
	infoList[0].degree = newWeather[props.selectedDay].wind.deg;
	infoList[1].value = `${newWeather[props.selectedDay].humidity}%`;

	if (newWeather[props.selectedDay].sun.sunset < Date.now()) {
		infoList[2].name = 'Coucher du soleil';
		infoList[2].value = format(fromUnixTime(newWeather[props.selectedDay].sun.sunset), "HH'h'mm");
	} else {
		infoList[2].name = 'Lever du soleil';
		infoList[2].value = format(fromUnixTime(newWeather[props.selectedDay].sun.sunrise), "HH'h'mm");
	}
}


</script>

<template>
	<main class="flex items-center sm:justify-center w-full h-60 gap-5 overflow-x-auto overflow-y-hidden snap-x snap-proximity whitespace-nowrap px-5 scroll-px-5">
		<MoreInfo v-for="info in infoList" :name="info.name" :value="info.value" :icon="info.icon" :degree="info.degree"
			:img="info.img" />
	</main>
</template>
