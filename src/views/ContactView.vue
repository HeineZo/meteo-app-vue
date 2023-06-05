<script setup>

</script>

<template>
  <main class="p-5 max-w-2xl m-auto min-h-screen flex flex-col sm:px-6 lg:px-8">
    <h1 class="text-4xl mb-5">Nous contacter</h1>
    <form class="flex flex-col mx-auto w-full rounded-3xl p-2 gap-5 items-center">
      <input type="text" placeholder="Objet"
        class="text-base focus-visible:ring focus-visible:ring-primary-400 focus-visible:ring-opacity-75 focus:text-base py-2 px-4 w-full rounded-3xl focus:outline-none" />
      <input type="email"
        class="text-base focus-visible:ring focus-visible:ring-primary-400 focus-visible:ring-opacity-75 focus:text-base py-2 px-4 w-full rounded-3xl focus:outline-none"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="E-mail" />
      <textarea
        class="text-base focus-visible:ring focus-visible:ring-primary-400 focus-visible:ring-opacity-75 focus:text-base py-2 px-4 w-full rounded-3xl focus:outline-none"
        placeholder="Message"></textarea>
      <button type="submit" class="bg-primary-400 shadow-sm rounded-3xl px-4 py-2 mb-3 font-medium hover:shadow-xl">
        <font-awesome-icon icon="fa-paper-plane" />
        Envoyer
      </button>
    </form>
  </main>
</template>
