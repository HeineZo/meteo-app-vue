import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import router from "../router/index.js";

export const useWeatherDataStore = defineStore("weatherData", () => {
  const apiKey = import.meta.env.VITE_VUE_APP_API_KEY;
  const weatherDataHourly = ref({});
  const weatherDataHourlyArray = ref([]);
  const weatherDataWeekly = ref([]);

  const loading = ref(false);
  const error = ref(null);
  const location = useRoute();
  const loadedOnce = ref(false);
  const selectedDay = ref(0);
  const currentWeather = reactive({
    cityName: "",
    weatherArray: [],
    temperature: 0,
    wind: {},
    humidity: 0,
    sun: {},
  });

  if (!apiKey) {
    throw new Error("Please add an API key to your .env file");
  } else {
    console.log("API key found");
  }

  const fetchCurrentPositionWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`
      );
	  const resWeekly = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`
	  );
      const dataHourly = await res.json();
	  const dataWeekly = await resWeekly.json();
      formatDataHourly(dataHourly);
      formatDataWeekly(dataWeekly);
    } catch (err) {
      error.value = err;
    }
	loading.value = false;
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
      const data = await res.json();
      formatDataHourly(data);
    } catch (err) {
      error.value = err;
    }
  };

  /**
   * Récupérer les données météo d'une ville pour les 7 prochains jours
   * @param city Ville dont on veut les données météo
   */
  const fetchWeatherDataWeekly = async (city) => {
    loadedOnce.value = true;
    loading.value = true;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apiKey}&units=metric&lang=fr`
      );
      const data = await res.json();
      formatDataWeekly(data);
    } catch (err) {
      error.value = err;
    }
    loading.value = false;
    if (location.name !== "accueil") {
      router.push("/");
    }
  };

  const formatDataHourly = async (data) => {
    weatherDataHourlyArray.value = [];
    for (let i = 0; i < 5; i++) {
      let weatherHourly = ref({});
      weatherHourly.value = {
        temp: data.list[i].main.temp,
        icon: data.list[i].weather[0].icon,
        time: data.list[i].dt,
      };
      weatherDataHourlyArray.value.push(weatherHourly.value);
    }
  };

  const formatDataWeekly = async (data) => {
    for (let i = 0; i < data.list.length; i++) {
      let date = new Date(data.list[i].dt * 1000);
      data.list[i] = {
        day:
          i === 0
            ? "Aujourd'hui"
            : date.toLocaleDateString("fr-FR", { weekday: "long" }),
        cityName: data.city.name,
        icon: data.list[i].weather[0].icon,
        description: data.list[i].weather[0].description,
        temp: data.list[i].temp.day.toFixed(0),
        humidity: data.list[i].humidity,
        wind: {
          speed: data.list[i].speed.toFixed(0),
          deg: data.list[i].deg,
        },
        sun: {
          sunrise: data.list[i].sunrise,
          sunset: data.list[i].sunset,
        },
      };
    }
    weatherDataWeekly.value = await data.list;
  };

  /**
   * Convertit le code de l'icône des données météo en emoji
   * @param iconCode Code de l'icône de l'API météo
   * @returns Emoji associé
   */
  const iconCodeToEmoji = (iconCode) => {
    const codeMap = {
      "01d": "sun",
      "01n": "crescent-moon	",
      "02d": "sun-behind-cloud",
      "02n": "sun-behind-cloud",
      "03d": "cloud",
      "03n": "cloud",
      "04d": "sun-behind-large-cloud",
      "04n": "sun-behind-large-cloud",
      "09d": "cloud-with-rain",
      "09n": "cloud-with-rain",
      "10d": "sun-behind-rain-cloud",
      "10n": "sun-behind-rain-cloud",
      "11d": "cloud-with-lightning",
      "11n": "cloud-with-lightning",
      "13d": "cloud-with-snow",
      "13n": "cloud-with-snow",
      "50d": "fog",
      "50n": "fog",
    };
    return codeMap[iconCode] || null;
  };

  return {
    weatherDataHourly,
    weatherDataHourlyArray,
    weatherDataWeekly,
    loading,
    loadedOnce,
    error,
    fetchWeatherDataHourly,
    fetchWeatherDataWeekly,
    fetchCurrentPositionWeather,
    iconCodeToEmoji,
    currentWeather,
    selectedDay,
  };
});
