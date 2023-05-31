import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router/index.js";

export const useWeatherDataStore = defineStore("weatherData", () => {
    const apiKey = import.meta.env.VITE_VUE_APP_API_KEY;
    const weatherData = ref({});
    const loading = ref(false);
    const test = ref("test");
    const error = ref(null);
    const location = useRoute();

    const cityName = ref("");
    const weatherArray = ref([]);
    const temperature = ref(0);

    if (!apiKey) {
        throw new Error("Please add an API key to your .env file");
    } else {
        console.log("API key found");
    }

    const fetchWeatherData = async (city) => {
        loading.value = true;
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
            );
            weatherData.value = await res.json();
            cityName.value = weatherData.value.name;
            weatherArray.value = weatherData.value.weather[0];
            temperature.value = weatherData.value.main.temp.toFixed(0);

            console.log(weatherArray.value);
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
            if (location.name !== "accueil") {
                router.push("/");
            }
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
        loading,
        error,
        fetchWeatherData,
        iconCodeToEmoji,
        test,
        cityName,
        temperature,
        weatherArray
    };
});
