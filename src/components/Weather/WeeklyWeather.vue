<script setup>
defineProps(['day', 'icon', 'description', 'temp'])

</script>

<template>
    <main
        class="flex w-full justify-between items-center h-50 text-xl p-5 rounded-full group cursor-pointer hover:bg-gray-200">
        <p class="text-gray-400 first-letter:uppercase">{{ day }}</p>
        <span class="flex gap-3">
            <img :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${icon}.svg`" />
            <p class="font-semibold first-letter:uppercase">{{ description }}</p>
        </span>
        <p class="font-bold">{{ temp }}°</p>
    </main>
</template>
