<script setup>
import MainInfo from '../components/Weather/MainInfo.vue';
import MoreInfoContainer from '../components/Weather/MoreInfoContainer.vue';
import DayContainer from '../components/HomeView/DayContainer.vue';
import { useWeatherDataStore } from "@/stores/weatherData";
import { storeToRefs } from "pinia";

const weather = useWeatherDataStore();

const { loadedOnce } = storeToRefs(weather);

</script>

<template>
  <main v-if=loadedOnce class="w-full flex items-center justify-center flex-col gap-10 mt-20 px-5">
    <MainInfo title="Météo" icon="sun" degrees="20" weather="Ensoleillé" />
    <MoreInfoContainer />
    <DayContainer />
  </main>
  <main v-else class="w-full mt-20 px-5 flex items-center justify-center" id="welcome">
    <div class="h-full w-1/2 flex flex-col justify-center items-center lg:relative absolute">
      <img width="300" class="animate-rotate"
        src="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/sun.svg" />
      <img width="300" class="absolute  left-px bottom-1/4 animate-move-x"
        src="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/cloud.svg" />
      <img width="300" class="absolute right-px top-1/4 animate-move-x" style="animation-direction: alternate-reverse"
        src="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/cloud.svg" />
    </div>
    <div class="h-96 flex flex-col justify-center items-center gap-10 z-10 backdrop-blur-md">
      <h1 class="font-black md:text-9xl text-6xl uppercase text-center text-black">Météo du jour</h1>
      <h2 class="font-semibold md:text-3xl text-xl text-gray-400 text-center">Recherchez une ville ou utilisez votre position</h2>
      <button class="rounded-xl bg-primary-300 px-5 py-2 font-bold hover:bg-primary-400">
        <font-awesome-icon icon="map-marker-alt" class="mr-2" />
        Me localiser
      </button>
    </div>
  </main>
</template>
<style>
/* Degradé bleu ciel vers blanc de haut en bas */
#app {
  background: linear-gradient(180deg, #c2defc 0%, #ffffff 100%);
}

</style>
<style scoped>
.animate-rotate {
  animation: rotate 120s linear infinite;
}

.animate-move-x {
  animation: move-x 3s ease-in-out infinite alternate;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes move-x {
  from {
    transform: translateX(-10px);
  }

  to {
    transform: translateX(10px);
  }
}
</style>