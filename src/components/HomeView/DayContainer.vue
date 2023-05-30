<script setup>
import Day from './Day.vue';
const hourList = [
  {"degrees": "20",
  "icon": "sun",
  "time": "10:00"
  },
  {"degrees": "23",
  "icon": "sun",
  "time": "11:00"
  },
  {"degrees": "25",
  "icon": "sun",
  "time": "12:00"
  },
  {"degrees": "26",
  "icon": "sun",
  "time": "13:00"
  },
  {"degrees": "27",
  "icon": "sun",
  "time": "14:00"
  }
]
</script>

<template>
  <main class="max-w-xl w-full flex flex-col gap-5 mt-24">
    <div class="flex justify-between items-center">
        <h3 class="font-bold text-xl">Aujourd'hui</h3>
        <RouterLink to="/week" class="flex items-center gap-1 cursor-pointer group">
            <p class="text-gray-400 font-semibold">7 jours</p>
            <img src="../../assets/chevron-right.svg" class="w-2 group-hover:translate-x-1">
        </RouterLink>
    </div>
    <div class="flex gap-5 overflow-x-auto overflow-y-hidden snap-x snap-proximity whitespace-nowrap">
      <Day v-for="hour in hourList" :degrees="hour.degrees" :icon="hour.icon" :time="hour.time"/>
    </div>
  </main>
</template>
