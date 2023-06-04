<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useWeatherDataStore } from "@/stores/weatherData";
import { useRoute } from "vue-router";

const weather = useWeatherDataStore();
const city = ref("");
const isOpen = ref(false);
const location = ref(useRoute());
</script>

<template>
  <nav class="sticky top-0 shadow z-50 backdrop-blur">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between gap-10">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <a href="/">
              <img class="h-8 w-8" src="../assets/app-icon.png" alt="Logo de l'application météo" />
            </a>
          </div>
          <!-- Navigation -->
          <div class="hidden sm:block">
            <div class="flex ml-10 items-baseline gap-5">
              <RouterLink to="/" :class="{
                'bg-primary-400': location.name === 'accueil',
              }" class="hover:bg-primary-300 block text-center rounded-md px-3 py-2 text-base font-medium">Accueil
              </RouterLink>
              <RouterLink to="/contact" :class="{
                'bg-primary-400': location.name === 'contact',
              }" class="hover:bg-primary-300 block text-center rounded-md px-3 py-2 text-base font-medium">Contact
              </RouterLink>
              <RouterLink to="/help" :class="{
                'bg-primary-400': location.name === 'help',
              }" class="hover:bg-primary-300 block text-center rounded-md px-3 py-2 text-base font-medium">Aide
              </RouterLink>
            </div>
          </div>
        </div>
        <!-- Barre de recherche -->
        <div class="flex relative items-center max-w-md w-full">
          <input type="search" placeholder="Rechercher en France" id="search"
            class="bg-gray-200 text-gray-800 hover:ring hover:ring-gray-300 focus:ring focus:ring-gray-300 py-2 px-4 w-full rounded-2xl focus:outline-none focus:shadow-sm hover:shadow-sm"
            v-model="city" @keypress="
              (event) => {
                if (event.key === 'Enter') {
                  weather.fetchWeatherDataHourly(city);
                  weather.fetchWeatherDataWeekly(city);
                }
              }
            " />
          <button id="search-button" class="border-none focus:outline-none absolute px-2 py-1.5 rounded-full right-3"
            @click="weather.fetchWeatherDataHourly(city); weather.fetchWeatherDataWeekly(city);">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-gray-400" />
          </button>
        </div>
        <!-- Bouton pour le menu mobile -->
        <div class="-mr-2 flex sm:hidden">
          <button type="button" @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center rounded-md p-2 text-lg text-gray-400 hover:bg-primary-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Menu déroulant</span>
            <font-awesome-icon icon="fa-solid fa-bars"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation mobile -->
    <Transition name="slide-left">
      <div v-if="isOpen" class="sm:hidden">
        <div class="absolute h-screen w-1/3 right-0 space-y-5 px-2 pb-3 pt-2 backdrop-blur shadow">
          <RouterLink to="/" :class="{
            'bg-primary-400': location.name === 'accueil',
          }" class="hover:bg-primary-300 block text-center rounded-md px-3 py-2 text-base font-medium">Accueil
          </RouterLink>
          <RouterLink to="/contact" :class="{
            'bg-primary-400': location.name === 'contact',
          }" class="hover:bg-primary-300 block text-center rounded-md px-3 py-2 text-base font-medium">Contact
          </RouterLink>
          <RouterLink to="/help" :class="{
            'bg-primary-400': location.name === 'help',
          }" class="hover:bg-primary-300 block text-center rounded-md px-3 py-2 text-base font-medium">Aide
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
  @apply backdrop-blur;
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
