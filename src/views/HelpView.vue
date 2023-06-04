<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

</script>
<template>
  <main class="p-5 max-w-5xl m-auto min-h-screen sm:px-6 lg:px-8">
    <h1 class="text-4xl mb-5">FAQ</h1>
    <div class="flex flex-col mx-auto w-full rounded-3xl p-2 shadow-2xl">
      <Disclosure as="disc" v-slot="{ open }">
        <DisclosureButton
          class="flex w-full justify-between rounded-3xl px-5 py-3 text-left text-lg hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
          <span>Comment utiliser l'application ?</span>
          <font-awesome-icon icon="fa-chevron-down" :class="open ? 'rotate-180 transform pb-1' : ''" class="h-5 pt-1" />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-base text-gray-500">
          Pour utiliser l'application, il vous suffit de
          rentrer le nom de la ville dans la barre de
          recherche et de cliquer sur l'icône de loupe ou d'appuer sur Entrée.
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="disc2" class="mt-2" v-slot="{ open }">
        <DisclosureButton
          class="flex w-full justify-between rounded-3xl px-5 py-3 text-left text-lg hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
          <span>Comment fonctionne l'application ?</span>
          <font-awesome-icon icon="fa-chevron-down" :class="open ? 'rotate-180 transform pb-1' : ''" class="h-5 pt-1" />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-base text-gray-500">
          L'application utilise l'API <a class="hover:text-primary-500"
            href="https://openweathermap.org/">OpenWeatherMap</a>
          pour
          récupérer les informations météorologiques de la
          ville recherchée.
          <br>
          <br>
          Pour accèder aux données météorologiques d'une ville sur les 7 prochains jours,
          appuyez sur le bouton "7 jours" à droite de la section "Aujourd'hui".
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="disc3" class="mt-2" v-slot="{ open }">
        <DisclosureButton
          class="flex w-full justify-between rounded-3xl px-5 py-3 text-left text-lg hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
          <span>Comment contacter les développeurs ?</span>
          <font-awesome-icon icon="fa-chevron-down" :class="open ? 'rotate-180 transform pb-1' : ''" class="h-5 pt-1" />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-base text-gray-500">
          Vous pouvez contacter les développeurs en cliquant
          sur le bouton "Contact" dans la barre de navigation
          ou en envoyant un mail directement à cette adresse :
          <a href="mailto:morvan.e2101960@etud.univ-ubs.fr"
            class="hover:text-primary-500">morvan.e2101960@etud.univ-ubs.fr</a>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
