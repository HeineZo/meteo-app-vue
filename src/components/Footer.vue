<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const location = ref(useRoute());
</script>

<template>
	<Teleport to="body">
		<footer class="bg-white">
			<div
				class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
				<nav class="flex flex-wrap justify-center -mx-5 -my-2">
					<div class="px-5 py-2">
						<RouterLink
							to="/"
							:class="
								location.name === 'accueil'
									? 'font-semibold'
									: 'font-normal'
							"
							class="text-base leading-6 text-gray-500 hover:text-gray-900">
							Accueil
						</RouterLink>
					</div>
					<div class="px-5 py-2">
						<RouterLink
							to="/contact"
							:class="
								location.name === 'contact'
									? 'font-semibold'
									: 'font-normal'
							"
							class="text-base leading-6 text-gray-500 hover:text-gray-900">
							Contact
						</RouterLink>
					</div>
					<div class="px-5 py-2">
						<RouterLink
							to="/help"
							:class="
								location.name === 'help'
									? 'font-semibold'
									: 'font-normal'
							"
							class="text-base leading-6 text-gray-500 hover:text-gray-900">
							Aide
						</RouterLink>
					</div>
				</nav>
				<p class="mt-8 text-base leading-6 text-center text-gray-400">
					© 2023 IUT de Vannes • Fait par Enzo & Elouann
				</p>
			</div>
		</footer>
	</Teleport>
</template>
