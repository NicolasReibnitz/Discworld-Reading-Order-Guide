<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated class="bg-paper">
			<q-toolbar class="font-primary text-black text-bold">
				<!-- <q-btn flat dense round icon="menu"  aria-label="Menu" @click="toggleLeftDrawer" /> -->
				<q-toolbar-title v-if="$q.screen.lt.sm" class="text-bold">T.C.A.G.T.D.R.O.</q-toolbar-title>
				<q-toolbar-title v-else class="text-bold">{{ packageJSON.productName }}</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<q-list>
				<q-item-label header> Essential Links </q-item-label>

				<EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
			</q-list>
		</q-drawer> -->

		<q-page-container class="flex flex-center">
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
	import { useQuasar } from 'quasar';

	import packageJSON from 'app/package.json';

	const $q = useQuasar();

	// console.log($q.platform);
	// console.log($q.screen);
	// console.log($q.screen.name);
	// console.log($q.screen.width);
	// console.log($q.screen.lt.md);

	// import { ref } from 'vue';
	// import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
	// const essentialLinks: EssentialLinkProps[] = [
	// 	{
	// 		title: 'Docs',
	// 		caption: 'quasar.dev',
	// 		icon: 'school',
	// 		link: 'https://quasar.dev'
	// 	},
	// 	{
	// 		title: 'Github',
	// 		caption: 'github.com/quasarframework',
	// 		icon: 'code',
	// 		link: 'https://github.com/quasarframework'
	// 	},
	// 	{
	// 		title: 'Discord Chat Channel',
	// 		caption: 'chat.quasar.dev',
	// 		icon: 'chat',
	// 		link: 'https://chat.quasar.dev'
	// 	},
	// 	{
	// 		title: 'Forum',
	// 		caption: 'forum.quasar.dev',
	// 		icon: 'record_voice_over',
	// 		link: 'https://forum.quasar.dev'
	// 	},
	// 	{
	// 		title: 'Twitter',
	// 		caption: '@quasarframework',
	// 		icon: 'rss_feed',
	// 		link: 'https://twitter.quasar.dev'
	// 	},
	// 	{
	// 		title: 'Facebook',
	// 		caption: '@QuasarFramework',
	// 		icon: 'public',
	// 		link: 'https://facebook.quasar.dev'
	// 	},
	// 	{
	// 		title: 'Quasar Awesome',
	// 		caption: 'Community Quasar projects',
	// 		icon: 'favorite',
	// 		link: 'https://awesome.quasar.dev'
	// 	}
	// ];

	// const leftDrawerOpen = ref(false);

	// function toggleLeftDrawer() {
	// 	leftDrawerOpen.value = !leftDrawerOpen.value;
	// }
</script>
