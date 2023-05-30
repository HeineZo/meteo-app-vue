import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router/index.js";

export const useWeatherDataStore = defineStore("weatherData", () => {
    const apiKey = import.meta.env.VITE_VUE_APP_API_KEY;
    const weatherData = ref({});
    const loading = ref(false);
    const error = ref(null);
    const location = useRoute();

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
            // console.log(weatherData.value);
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
            if (location.name !== "accueil") {
                router.push("/");
            }
        }
    };
    return {
        weatherData,
        loading,
        error,
        fetchWeatherData,
    };
});
