<template>
	<q-page padding class="row text-center content-center items-center justify-center font-primary q-pt-none q-pb-xl" style="max-width: 1000px">
		<p class="text-h2 text-bold q-mb-xl">{{ packageJSON.productName }}*</p>
		<q-btn :to="{ name: 'discworld' }" flat dense :ripple="false" :no-caps="false" padding="xs md" class="q-mt-xl font-primary !text-italic text-h4"><span class="q-pt-xs q-pr-md">☞</span>Enter<span class="q-pt-xs q-pl-md">☜</span></q-btn>
		<p class="text-h6 text-italic q-mb-lg full-width absolute-bottom">*Wherein probably be no dragons.</p>
	</q-page>
</template>

<script setup lang="ts">
	import packageJSON from 'app/package.json';
</script>
