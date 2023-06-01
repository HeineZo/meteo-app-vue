import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router/index.js";

export const useWeatherDataStore = defineStore("weatherData", () => {
    const apiKey = import.meta.env.VITE_VUE_APP_API_KEY;
    const weatherData = ref({});
    const weatherDataHourly = ref({});

    // const weatherDateHourly1 = ref({});
    const weatherDataHourlyArray = ref([]);

    const loading = ref(false);
    const error = ref(null);
    const location = useRoute();
    const loadedOnce = ref(false);

    const cityName = ref("");
    const weatherArray = ref([]);
    const temperature = ref(0);
    const wind = ref({});
    const humidity = ref(0);

    if (!apiKey) {
        throw new Error("Please add an API key to your .env file");
    } else {
        console.log("API key found");
    }

    const fetchWeatherData = async (city) => {
        loading.value = true;
        loadedOnce.value = true;
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
            );
            weatherData.value = await res.json();
            cityName.value = weatherData.value.name;
            weatherArray.value = weatherData.value.weather[0];
            temperature.value = weatherData.value.main.temp.toFixed(0);
            wind.value = weatherData.value.wind;
            humidity.value = weatherData.value.main.humidity;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
            if (location.name !== "accueil") {
                router.push("/");
            }
        }
    };

    const fetchWeatherDataHourly = async (city) => {
        loading.value = true;
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
            weatherDataHourly.value = await res.json();

            for(let i = 0; i < 5; i++) {
                let weatherDateHourly = ref({});
                weatherDateHourly.value = {
                    temp: weatherDataHourly.value.list[i].main.temp, 
                    icon: weatherDataHourly.value.list[i].weather[0].icon,
                    time: weatherDataHourly.value.list[i].dt, 
                };
                weatherDataHourlyArray.value.push(weatherDateHourly.value);
            }
            console.log(weatherDataHourlyArray.value);
            // weatherDateHourly1.value = {
            //     temp: weatherDataHourly.value.list[0].main.temp, 
            //     icon: weatherDataHourly.value.list[0].weather[0].icon,
            //     time: weatherDataHourly.value.list[0].dt_txt, 
            // };
            // weatherDateHourly2.value = {
            //     temp: weatherDataHourly.value.list[1].main.temp,
            //     icon: weatherDataHourly.value.list[1].weather[0].icon,
            //     time: weatherDataHourly.value.list[1].dt_txt,
            // };
            // weatherDateHourly3.value = {
            //     temp: weatherDataHourly.value.list[2].main.temp,
            //     icon: weatherDataHourly.value.list[2].weather[0].icon,
            //     time: weatherDataHourly.value.list[2].dt_txt,
            // };
            // weatherDateHourly4.value = {
            //     temp: weatherDataHourly.value.list[3].main.temp,
            //     icon: weatherDataHourly.value.list[3].weather[0].icon,
            //     time: weatherDataHourly.value.list[3].dt_txt,
            // };
        } catch (err) {
            error.value = err;
        }
    };


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
        loading,
        error,
        fetchWeatherData,
        fetchWeatherDataHourly,
        iconCodeToEmoji,
        cityName,
        temperature,
        weatherArray,
        wind,
        humidity,
        loadedOnce,
        // weatherDateHourly1,
        // weatherDateHourly2,
        // weatherDateHourly3,
        // weatherDateHourly4,
        // weatherDateHourly5,
        weatherDataHourlyArray
    };
});
