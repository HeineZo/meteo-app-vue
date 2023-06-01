import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router/index.js";

export const useWeatherDataStore = defineStore("weatherData", () => {
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

    const cityName = ref("");
    const weatherArray = ref([]);
    const temperature = ref(0);
    const wind = ref({});
    const humidity = ref(0);
    const sun = ref({})

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
            sun.value = {sunrise: weatherData.value.sys.sunrise, sunset: weatherData.value.sys.sunset};
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
        weatherDataHourlyArray.value = [];
        loading.value = true;
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
            weatherDataHourly.value = await res.json();

            for(let i = 0; i < 5; i++) {
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

    const fetchWeatherDataWeekly = async (city) => {
        weatherDataWeeklyArray.value = [];
        loading.value = true;
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
            weatherDataWeekly.value = await res.json();
            
            for(let i = 0; i < 7; i++) {
                let weatherWeekly = ref({});
                let date = new Date(weatherDataWeekly.value.list[i].dt * 1000);
                weatherWeekly.value = {
                    day: i === 0 ? "Aujourd'hui" : date.toLocaleDateString('fr-FR', {weekday: 'long'}),
                    icon: weatherDataWeekly.value.list[i].weather[0].icon,
                    description: weatherDataWeekly.value.list[i].weather[0].description,
                    temp: weatherDataWeekly.value.list[i].temp.day.toFixed(0), 
                };
                console.log(weatherWeekly.value)
                weatherDataWeeklyArray.value.push(weatherWeekly.value);
            }
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
        weatherDataHourlyArray,
        weatherDataWeeklyArray,
        loading,
        loadedOnce,
        error,
        fetchWeatherData,
        fetchWeatherDataHourly,
        fetchWeatherDataWeekly,
        iconCodeToEmoji,
        cityName,
        temperature,
        weatherArray,
        wind,
        humidity,
        sun,
    };
});
