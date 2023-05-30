<script setup>
defineProps(['name', 'value', 'icon'])
</script>

<template>
    <main class="flex items-center justify-center flex-col shadow-2xl p-5 rounded-3xl w-44">
        <font-awesome-icon :icon="['fas', icon]" class="text-3xl mb-3" />
        <p class="font-bold">{{ value }}</p>
        <span class="text-gray-400">{{ name }}</span>
    </main>
</template>
