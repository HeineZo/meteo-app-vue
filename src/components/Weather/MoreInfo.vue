<script setup>
import {ref} from 'vue'
defineProps(['name', 'value', 'icon', 'degree'])
// console.log(degree.value)
</script>

<template>
    <main class="flex items-center justify-center flex-col shadow-2xl p-5 rounded-3xl w-44">
        <font-awesome-icon :icon="icon" :style="{ 'transform': 'rotate('+ degree + 'deg)' }"  class="text-3xl mb-3" />
        <p class="font-bold">{{ value }}</p>
        <span class="text-gray-400">{{ name }}</span>
    </main>
</template>
