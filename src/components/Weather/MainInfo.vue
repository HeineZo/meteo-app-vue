<script setup>
defineProps(['title', 'degrees', 'icon', 'weather'])
</script>

<template>
  <main class="flex items-center flex-col">
    <h1 class="text-4xl">{{title}}</h1>
    <img width="200" class="my-5" :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${icon}.svg`" />
    <h1 class="text-7xl text-black font-bold">{{degrees}}°</h1>
    <h2 class="text-2xl text-gray-400">{{ weather }}</h2>
  </main>
</template>
