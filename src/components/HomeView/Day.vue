<script setup>
defineProps(['degrees', 'time', 'icon'])


</script>

<template>
  <main class="flex flex-col items-center justify-center bg-gray-100 rounded-3xl min-w-max p-5 snap-center">
    <p class="text-xl font-bold">{{ degrees }}°</p>
    <img width="50" :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${icon}.svg`">
    <span class="text-gray-400 font-semibold">{{ time }}</span>
  </main>
</template>
