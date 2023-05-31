<script setup>
import MoreInfo from './MoreInfo.vue';
import { ref, reactive, watch } from 'vue';
import { useWeatherDataStore } from '@/stores/weatherData';
import { storeToRefs } from 'pinia';

const weather = useWeatherDataStore();
const { wind, humidity } = storeToRefs(weather);

const infoList = ref([
	{
		name: 'Vent',
		value: `${wind?.value?.speed?.toFixed(0)} km/h`,
		icon: 'compass',
    degree: wind.value.deg,
	},
	{ name: 'Humidité', value: `${humidity?.value}%`, icon: 'tint' },
]);

watch(wind, (newWind) => {
  infoList.value[0].value = `${newWind.speed.toFixed(0)} km/h`;
  infoList.value[0].degree = newWind.degree;
});

watch(humidity, (newHumidity) => {
  console.log(newHumidity)
  infoList.value[1].value = `${newHumidity}%`;
});


// { name: 'Lever du soleil', value: '07:00', icon: 'fa-sunrise' },
// { name: 'Coucher du soleil', value: '19:00', icon: 'fa-sunset' },]
</script>

<template>
	<main class="flex items-center justify-center gap-5">
		<MoreInfo
			v-for="info in infoList"
			:name="info.name"
			:value="info.value" 
			:icon="info.icon"
      :degree="info.degree" />
	</main>
</template>
