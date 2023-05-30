<script setup>
import MoreInfo from './MoreInfo.vue';
const infoList = [
  { name: 'Vent', value: '13 km/h', icon: 'fa-wind' },
  { name: 'Humidité', value: '50%', icon: 'fa-tint' },]
  // { name: 'Lever du soleil', value: '07:00', icon: 'fa-sunrise' },
  // { name: 'Coucher du soleil', value: '19:00', icon: 'fa-sunset' },]
</script>

<template>
  <main class="flex items-center justify-center gap-5">
    <MoreInfo v-for="info in infoList" :name="info.name" :value="info.value" :icon="info.icon" />
  </main>
</template>
