<script setup>
defineProps(['day', 'icon', 'description', 'temp', 'selected'])

</script>

<template>
    <main
        class="flex justify-between gap-4 w-full h-50 text-xl p-5 rounded-full group cursor-pointer hover:bg-gray-200"
        :class="selected ? 'bg-gray-200 cursor-default' : ''"
        >
        <p class="text-gray-400 first-letter:uppercase w-32">{{ day }}</p>
        <span class="flex gap-3 w-44">
            <img :src="`https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/modern/${icon}.svg`" />
            <p class="font-semibold first-letter:uppercase">{{ description }}</p>
        </span>
        <p class="font-bold text-right w-fit">{{ temp }}°</p>
    </main>
</template>
