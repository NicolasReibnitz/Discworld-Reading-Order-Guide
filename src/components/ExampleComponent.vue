<template>
	<div>
		<p class="text-h3">{{ title }}</p>
		<ul>
			<li v-for="todo in todos" :key="todo.id" class="font-primary" @click="increment">{{ todo.id }} - {{ todo.content }}</li>
		</ul>
		<p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
		<p>Active: {{ active ? 'yes' : 'no' }}</p>
		<p>Clicks on todos: {{ clickCount }}</p>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';

	import { Meta, Todo } from './models';

	interface Props {
		title: string;
		todos?: Todo[];
		meta: Meta;
		active: boolean;
	}
	const props = withDefaults(defineProps<Props>(), {
		todos: () => []
	});

	const clickCount = ref(0);
	function increment() {
		clickCount.value += 1;
		return clickCount.value;
	}

	const todoCount = computed(() => props.todos.length);
</script>
