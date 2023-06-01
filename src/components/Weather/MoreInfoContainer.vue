<script setup>
import MoreInfo from './MoreInfo.vue';
import {format, fromUnixTime} from 'date-fns'
import { ref, watch } from 'vue';
import { useWeatherDataStore } from '@/stores/weatherData';
import { storeToRefs } from 'pinia';

const weather = useWeatherDataStore();
const { wind, humidity, sun } = storeToRefs(weather);

const infoList = ref([
	{
		name: 'Vent',
		value: `${wind?.value?.speed?.toFixed(0)} km/h`,
		icon: 'compass',
		degree: wind.value.deg,
	},
	{ name: 'Humidité', value: `${humidity?.value}%`, icon: 'tint' },
	{icon: 'sun'}
]);

watch(wind, (newWind) => {
	infoList.value[0].value = `${newWind.speed.toFixed(0)} km/h`;
	infoList.value[0].degree = newWind.degree;
});

watch(humidity, (newHumidity) => {
	infoList.value[1].value = `${newHumidity}%`;
});

watch(sun, (newSun) => {
	if (newSun.sunset < Date.now()) {
		infoList.value[2].name = 'Coucher du soleil';
		infoList.value[2].value = format(fromUnixTime(newSun.sunset), "HH'h'mm");
	} else {
		infoList.value[2].name = 'Lever du soleil';
		infoList.value[2].value = format(fromUnixTime(newSun.sunrise), "HH'h'mm");
	}
})
</script>

<template>
	<main class="flex items-center justify-center gap-5">
		<MoreInfo
			v-for="info in infoList"
			:name="info.name"
			:value="info.value"
			:icon="info.icon"
			:degree="info.degree"
			:img = "info.img" />
	</main>
</template>
