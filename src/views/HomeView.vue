<script setup>
import MainInfo from '../components/Weather/MainInfo.vue';
import MoreInfoContainer from '../components/Weather/MoreInfoContainer.vue';
import DayContainer from '../components/HomeView/DayContainer.vue';

</script>

<template>
  <main class="w-full flex items-center justify-center flex-col gap-10 px-5">
    <MainInfo title="Vannes" icon="sun" degrees="20" weather="Ensoleillé"/>
    <MoreInfoContainer />
    <DayContainer />
  </main>
</template>
