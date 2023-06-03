<script setup>
defineProps(['name', 'value', 'icon', 'degree', 'img'])
</script>

<template>
    <main class="flex items-center justify-center flex-col shadow-2xl p-5 rounded-3xl min-w-[11rem] snap-start">
        <font-awesome-icon v-if="icon" :icon="icon" :style="{ 'transform': 'rotate('+ degree + 'deg)' }"  class="text-3xl mb-3" />
        <p class="font-bold first-letter:uppercase">{{ value }}</p>
        <span class="text-gray-400">{{ name }}</span>
    </main>
</template>
