import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router/index.js';

export const useWeatherDataStore = defineStore('weatherData', () => {
	const apiKey = import.meta.env.VITE_VUE_APP_API_KEY;
	const weatherData = ref({});

	const weatherDataHourly = ref({});
	const weatherDataHourlyArray = ref([]);
	const weatherDataWeekly = ref({});
	const weatherDataWeeklyArray = ref([]);

	const loading = ref(false);
	const error = ref(null);
	const location = useRoute();
	const loadedOnce = ref(false);
	const selectedDay = reactive({
		index: 0,
	});

    const currentWeather = reactive({
        cityName: '',
        weatherArray: [],
        temperature: 0,
        wind: {},
        humidity: 0,
        sun: {},
    })

	if (!apiKey) {
		throw new Error('Please add an API key to your .env file');
	} else {
		console.log('API key found');
	}

	/**
	 * Récupérer les données météo d'une ville
	 * @param city Ville dont on veut les données météo
	 */
	const fetchWeatherData = async (city) => {
		loading.value = true;
		loadedOnce.value = true;
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
			);
			weatherData.value = await res.json();
			currentWeather.cityName = weatherData.value.name;
			currentWeather.weatherArray = weatherData.value.weather[0];
			currentWeather.temperature = weatherData.value.main.temp.toFixed(0);
			currentWeather.wind = weatherData.value.wind;
			currentWeather.humidity = weatherData.value.main.humidity;
			currentWeather.sun = {
				sunrise: weatherData.value.sys.sunrise,
				sunset: weatherData.value.sys.sunset,
			};
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
			if (location.name !== 'accueil') {
				router.push('/');
			}
		}
	};

	/**
	 * Récupérer les données météo d'une ville pour les 5 prochaines heures
	 * @param city Ville dont on veut les données météo
	 */
	const fetchWeatherDataHourly = async (city) => {
		weatherDataHourlyArray.value = [];
		loading.value = true;
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`
			);
			weatherDataHourly.value = await res.json();

			for (let i = 0; i < 5; i++) {
				let weatherHourly = ref({});
				weatherHourly.value = {
					temp: weatherDataHourly.value.list[i].main.temp,
					icon: weatherDataHourly.value.list[i].weather[0].icon,
					time: weatherDataHourly.value.list[i].dt,
				};
				weatherDataHourlyArray.value.push(weatherHourly.value);
			}
		} catch (err) {
			error.value = err;
		}
	};

	/**
	 * Récupérer les données météo d'une ville pour les 7 prochains jours
	 * @param city Ville dont on veut les données météo
	 */
	const fetchWeatherDataWeekly = async (city) => {
		loading.value = true;
        try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apiKey}&units=metric&lang=fr`
			);
			console.log(await res.json())
			weatherDataWeeklyArray.value = await res.json();
		} catch (err) {
			error.value = err;
		}

		for (let i = 0; i < weatherDataWeeklyArray.value.list.length; i++) {
			let date = new Date(weatherDataWeeklyArray.value.list[i].dt * 1000);
			weatherDataWeeklyArray.value.list[i] = {
				day:
					i === 0
						? "Aujourd'hui"
						: date.toLocaleDateString('fr-FR', { weekday: 'long' }),
				icon: weatherDataWeeklyArray.value.list[i].weather[0].icon,
				description: weatherDataWeeklyArray.value.list[i].weather[0].description,
				temp: weatherDataWeeklyArray.value.list[i].temp.day.toFixed(0),
			};
		}
        weatherDataWeekly.value = weatherDataWeeklyArray.value.list;
	};

	/**
	 * Convertis le code de l'icône des données météo en emoji
	 * @param iconCode Code de l'icône de l'API météo
	 * @returns Emoji associé
	 */
	const iconCodeToEmoji = (iconCode) => {
		const codeMap = {
			'01d': 'sun',
			'01n': 'crescent-moon	',
			'02d': 'sun-behind-cloud',
			'02n': 'sun-behind-cloud',
			'03d': 'cloud',
			'03n': 'cloud',
			'04d': 'sun-behind-large-cloud',
			'04n': 'sun-behind-large-cloud',
			'09d': 'cloud-with-rain',
			'09n': 'cloud-with-rain',
			'10d': 'sun-behind-rain-cloud',
			'10n': 'sun-behind-rain-cloud',
			'11d': 'cloud-with-lightning',
			'11n': 'cloud-with-lightning',
			'13d': 'cloud-with-snow',
			'13n': 'cloud-with-snow',
			'50d': 'fog',
			'50n': 'fog',
		};
		return codeMap[iconCode] || null;
	};

	return {
		weatherData,
		weatherDataHourly,
		weatherDataHourlyArray,
		weatherDataWeekly,
		weatherDataWeeklyArray,
		loading,
		loadedOnce,
		error,
		fetchWeatherData,
		fetchWeatherDataHourly,
		fetchWeatherDataWeekly,
		iconCodeToEmoji,
        currentWeather,
		selectedDay
	};
});
