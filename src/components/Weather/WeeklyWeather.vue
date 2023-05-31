<script setup>
defineProps(['day', 'icon', 'weather', 'temperature', 'index'])

</script>

<template>
    <main
        class="flex w-full justify-between items-center h-50 text-xl p-5 rounded-full group cursor-pointer hover:bg-gray-200"
        :class="{ 'bg-gray-50': index % 2 !== 0 }">
        <p class="text-gray-400">{{ day }}</p>
        <span class="flex gap-3">
            <img :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${icon}.svg`" />
            <p class="font-semibold">{{ weather }}</p>
        </span>
        <p class="font-bold">{{ temperature }}°</p>
    </main>
</template>
