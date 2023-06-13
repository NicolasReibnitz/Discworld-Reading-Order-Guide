<template>
	<q-page padding class="row full-width font-primary" style="max-width: 1000px">
		<div class="col-12">
			<p class="text-h2 text-bold q-mb-lg q-px-md">Discworld Reading Order</p>
			<div class="q-mb-md">
				<q-toggle v-for="availableSubserie in availableSubseries" :key="availableSubserie" v-model="seriesActive" :color="getSubsectionColor(availableSubserie)" :val="availableSubserie" :label="availableSubserie" />
			</div>
			<!-- <pre>{{ books }}</pre> -->
			<!-- <pre>{{ books[13] }}</pre> -->
			<!-- <pre>{{ series }}</pre> -->
			<!-- <pre>{{ subseries }}</pre> -->
			<!-- <q-toggle v-for="availableLocation in availableLocations" :key="availableLocation" v-model="locations" :color="getSubsectionColor(availableLocation)" :val="availableLocation" :label="availableLocation" /> -->
			<!-- <q-toggle v-model="subseries" val="carbs" label="Carbs" />
			<q-toggle v-model="subseries" val="protein" label="Protein" />
			<q-toggle v-model="subseries" val="sodium" label="Sodium" />
			<q-toggle v-model="subseries" val="calcium" label="Calcium" />
			<q-toggle v-model="subseries" val="iron" label="Iron" /> -->
			<!-- <p>{{ booksRead }}</p> -->
			<!-- <q-table title="Treats" :rows="discworldBooks" :columns="columns" row-key="name" /> -->
			<q-table v-model:selected="selected" hide-bottom :dense="dense" flat selection="multiple" :rows="books" :columns="columns" :visible-columns="visibleColumns" :pagination="pagination" row-key="id" :filter="seriesActive" :filter-method="filterSubseries" class="books-table bg-transparent q-mb-xl" @selection="onSelection">
				<!-- <q-table v-model:selected="selected" flat dense selection="multiple" :rows="discworldBooks" :pagination="pagination" row-key="title" class="bg-transparent"> -->
				<!-- <template #header></template> -->
				<template #header-selection> READ </template>

				<!-- <template #body-selection="scope">
					<q-toggle v-model="scope.selected" />
				</template> -->
				<template #body="props">
					<q-tr :props="props" @click="onRowClick(props)">
						<q-td key="id" auto-width :props="props"><q-checkbox v-model="props.selected" dense /></q-td>
						<q-td key="id" auto-width :props="props">{{ props.row.id }}</q-td>
						<q-td key="date" auto-width :props="props">{{ props.row.date }}</q-td>
						<q-td key="title" :props="props" class="title-column !text-no-wrap">
							<!-- <q-tr v-html="'#' + props.row.id + ': ' + props.row.title" /> -->
							<!-- eslint-disable-next-line vue/no-v-html, vue/no-v-text-v-html-on-component -->
							<q-tr v-html="props.row.titleEn + ' (' + props.row.year + ')'" />
							<q-tr v-if="$q.screen.lt.sm">
								<q-badge v-for="_subseries in props.row.subseries" :key="props.row.id + _subseries.title" rounded :color="_subseries.color" :text-color="_subseries.text" class="subseries-badge q-mr-sm">{{ _subseries.title }}</q-badge>
								<q-badge v-for="_locations in props.row.locations" :key="props.row.id + _locations.title" rounded :color="_locations.color" :text-color="_locations.text" class="subseries-badge q-mr-sm">{{ _locations.title }}</q-badge>
							</q-tr>
						</q-td>
						<!-- eslint-disable-next-line vue/no-v-html, vue/no-v-text-v-html-on-component -->
						<q-td key="title_es" :props="props" v-html="props.row.title_es" />
						<q-td key="subseries" :props="props" class="vertical-top">
							{{ props.row.series }}
							<q-badge v-for="_series in props.row.series" :key="_series.id + _series.title" rounded :color="_series.color" :text-color="_series.text" class="subseries-badge q-mr-sm">{{ _series.title }}</q-badge>
							<!-- <q-badge v-for="_subseries in props.row.subseries" :key="props.row.id + _subseries.title" rounded :color="_subseries.color" :text-color="_subseries.text" class="subseries-badge q-mr-sm">{{ _subseries.title }}</q-badge> -->
						</q-td>
						<q-td key="subseries_es" :props="props" class="vertical-top">
							<q-badge v-for="subseries_es in props.row.subseries_es" :key="props.row.id + subseries_es.title" rounded :color="subseries_es.color" :text-color="subseries_es.text" class="subseries-badge q-mr-sm">{{ subseries_es.title }}</q-badge>
						</q-td>
						<!-- <q-td key="locations" :props="props" class="vertical-top">
							<template v-if="props.row.locations.length">
								<q-badge v-for="_locations in props.row.locations" :key="props.row.id + _locations.title" rounded :color="_locations.color" :text-color="_locations.text" class="subseries-badge q-mr-sm">{{ _locations.title }}</q-badge>
							</template>
						</q-td> -->
						<q-td key="motives" :props="props">{{ getDetailsRowByID(props.row.id)?.motives }}</q-td>
						<q-td key="notes" :props="props">{{ getDetailsRowByID(props.row.id)?.notes }}</q-td>
					</q-tr>
					<q-tr v-show="props.expand" :props="props">
						<q-td colspan="2">
							<img :src="getCoverImage(props.row.id)" :alt="props.row.title" class="cover-image" />
						</q-td>
						<q-td colspan="100%" class="table-wrapper q-pa-none">
							<table class="q-table full-height">
								<q-tr>
									<q-td auto-width style="vertical-align: top">
										<div class="text-left">
											<b>Titles:</b>
										</div>
									</q-td>
									<q-td colspan="100%" style="vertical-align: top">
										<!-- eslint-disable-next-line vue/no-v-html, vue/no-v-text-v-html-on-component -->
										<div class="text-left" v-html="props.row.title + ' / ' + props.row.title_es + ' / ' + props.row.title_de"></div>
									</q-td>
								</q-tr>
								<q-tr>
									<q-td auto-width style="vertical-align: top">
										<div class="text-left"><b>Motives:</b></div>
									</q-td>
									<q-td colspan="100%" style="vertical-align: top">
										<div class="text-left">{{ getDetailsRowByID(props.row.id)?.motives }}</div>
									</q-td>
								</q-tr>
								<q-tr>
									<q-td auto-width style="vertical-align: top">
										<div class="text-left"><b>Notes:</b></div>
									</q-td>
									<q-td colspan="100%" style="vertical-align: top">
										<div class="text-left">{{ getDetailsRowByID(props.row.id)?.notes }}</div>
									</q-td>
								</q-tr>
							</table>
						</q-td>
					</q-tr>
				</template>
			</q-table>
		</div>
	</q-page>
</template>

<script setup lang="ts">
	import { useStorage } from '@vueuse/core';
	import { useRepo } from 'pinia-orm';
	import { useQuasar } from 'quasar';
	import { computed, nextTick, ref } from 'vue';

	import useInsertDataInStore from '../composables/useInsertDataInStore';
	import discworldBooksDetailsJSON from '../data/discworld-books-details.json';
	import discworldBooksJSON from '../data/discworld-books-main.json';
	import Book from '../models/Book';
	import Series from '../models/Series';
	import Subseries from '../models/Subseries';
	import { DiscworldBook, DiscworldBookDetails, DiscworldBookMain, Location, QTablePropsColumn, Subserie } from '../types';

	const bookRepo = useRepo(Book);
	const seriesRepo = useRepo(Series);
	const subseriesRepo = useRepo(Subseries);
	const insertDataInStore = useInsertDataInStore();

	insertDataInStore.insertSeries();
	insertDataInStore.insertSubseries();
	insertDataInStore.insertCategories();
	insertDataInStore.insertBooks();

	// Getting all users with their todos as relation
	const books = computed(() =>
		bookRepo
			.with('categories')
			.with('subseries')
			.with('series', query => {
				query.with('subseries');
			})
			.get()
	);
	const series = computed(() => seriesRepo.with('books').with('subseries').get());
	const subseries = computed(() => subseriesRepo.with('series').get());

	// seriesRepo.save({ id: 1, title: 'Wizards' });
	// subseriesRepo.save({ id: 1, title: 'Rincewind', seriesId: 1 });
	// bookRepo.insert({ id: 1, title: 'The Colour of Magic', year: 1983, seriesId: 1 });

	console.log('books: ', books);

	const $q = useQuasar();

	const coverImages = import.meta.globEager('/src/assets/covers/discworld/*'); /* */
	// console.log('coverImages: ', coverImages['/src/assets/covers/discworld/dw-01.jpg']);

	// console.log('getCoverImage(1): ', getCoverImage(1));
	const booksRead = useStorage('dw-books-read', Array<number>);

	const dense = ref(true);
	const seriesActive = ref([]);
	// const locations = ref([]);
	const selected = ref<DiscworldBookMain[]>([]);
	const visibleColumns = computed(() => ($q.screen.gt.xs ? ['subseries', 'locations'] : []));
	const discworldBooks = computed(() => parseBooks(discworldBooksJSON));
	const availableSubseries = computed<string[]>(() => getSubseries(discworldBooks.value));
	// const availableLocations = computed<string[]>(() => getLocations(discworldBooks.value));

	// console.log('availableSubseries: ', availableSubseries.value);

	const pagination = {
		sortBy: 'id',
		descending: false,
		page: 1,
		rowsPerPage: 0
	};

	// window.discworldBooks = discworldBooksJSON;

	booksRead.value.forEach((book: any) => {
		const index = discworldBooksJSON.findIndex((b: any) => b.id === book);
		if (index !== -1) {
			selected.value.push(discworldBooksJSON[index]);
		}
	});

	const columns: QTablePropsColumn[] = [
		{
			name: 'id',
			required: true,
			label: 'NO.',
			align: 'right',
			field: 'id',
			sortable: true
		},
		{ name: 'date', required: false, align: 'left', label: 'DATE', field: 'date', sortable: true },
		{ name: 'title', required: true, align: 'left', label: 'TITLE', field: 'title', sortable: true },
		{ name: 'title_es', required: false, align: 'left', label: 'TITLE (ES)', field: 'title_es', sortable: false },
		{
			name: 'subseries',
			required: false,
			align: 'left',
			label: 'SUBSERIES',
			field: 'subseries',
			sortable: false,
			sort: sortSubseries
		},
		{
			name: 'subseries_es',
			required: false,
			align: 'left',
			label: 'SUBSERIES (ES)',
			field: 'subseries_es',
			sortable: false,
			sort: sortSubseries
		},
		{ name: 'locations', required: false, align: 'left', label: 'LOCATIONS', field: 'locations', sortable: false, sort: sortSubseries },
		{ name: 'motives', required: false, align: 'left', label: 'MOTIVES', field: 'motives', sortable: true },
		{ name: 'notes', required: false, align: 'left', label: 'NOTES', field: 'notes', sortable: true }
	];

	function filterSubseries(rows: readonly DiscworldBook[], terms: string[]) {
		// console.log('getCellValue: ', getCellValue);
		// console.log('cols: ', cols);
		// console.log('terms: ', terms);
		// console.log('rows: ', rows);
		if (terms.length === 0) {
			return rows;
		}
		return rows.filter((row: DiscworldBook) => {
			if (typeof row.subseries !== 'string') {
				// return row.subseries.find((subserie: Subseries) => subserie.title.includes(terms));
				const result = row.subseries.some((subserie: Subserie) => terms.includes(subserie.title));
				// console.log('result: ', result);
				return result;
			}
			return false;
		});
	}

	function sortSubseries(a: Subserie[], b: Subserie[]) {
		// if (a[0]?.title === b[0]?.title) {
		// 	return 0;
		// } else
		if (a[0]?.title === undefined) {
			return -1;
		} else if (b[0]?.title === undefined) {
			return 1;
		}
		// eslint-disable-next-line no-nested-ternary
		return a[0]?.title > b[0]?.title ? -1 : a[0]?.title < b[0]?.title ? 1 : 0;
	}

	function parseBooks(books: DiscworldBookMain[]) {
		books.forEach((book: any) => {
			book.read = true;

			if (book.title.includes('Faust')) {
				book.title = book.title.replace('Faust', '<s>Faust</s>');
				book.title_es = book.title_es.replace('Fausto', '<s>Fausto</s>');
			}

			if (typeof book.subseries === 'string') {
				const subseriesSet: Set<string> = new Set();

				book.subseries.split(',').map((subseries: string) => subseriesSet.add(subseries.trim()));
				book.subseries = [];

				subseriesSet.forEach((subserie: string) => {
					const title = subserie.trim().replace('Industrial Revolution', 'Industrial Rev.');
					const color = getSubsectionColor(title);
					const text = getSubsectionTextColor(color);
					book.subseries.push({ title, color, text });
				});

				book.subseries_es = book?.subseries_es?.split(',').map((subseries: string) => {
					const title = subseries.trim().replace('Industrial Revolution', 'Industrial Rev.');
					const color = getSubsectionColor(title);
					const text = getSubsectionTextColor(color);
					return { title, color, text };
				});
			}

			if (book.locations && typeof book.locations === 'string') {
				const locationsSet: Set<string> = new Set();

				book.locations.split(',').map((locations: string) => locationsSet.add(locations.trim()));
				book.locations = [];

				locationsSet.forEach((location: string) => {
					const title = location.trim();
					const color = getSubsectionColor(title);
					const text = getSubsectionTextColor(color);
					book.locations.push({ title, color, text });
				});
			}
		});

		return books;
	}

	function getSubseries(books: DiscworldBookMain[]): string[] {
		const subseries: Set<string> = new Set();
		books.forEach(book => {
			if (Array.isArray(book.subseries)) {
				book.subseries.forEach((subserie: Subserie) => {
					subseries.add(subserie.title);
				});
			}
		});
		return Array.from(subseries);
	}

	function getLocations(books: DiscworldBookMain[]): string[] {
		const locations: Set<string> = new Set();
		books.forEach(book => {
			if (Array.isArray(book.locations)) {
				book.locations.forEach((location: Location) => {
					locations.add(location.title);
				});
			}
		});
		return Array.from(locations);
	}

	function getSubsectionColor(color: string) {
		switch (color) {
			case 'City Watch':
				return 'warning';
			case 'Death':
				return 'dark';
			case 'The Witches':
				return 'grey';
			case 'Rincewind':
				return 'info';
			case 'The Wizards':
				return 'faded';
			case 'Tiffany Aching':
				return 'negative';
			case 'Moist von Lipwig':
				return 'orange';
			case 'Industrial Rev.':
				return 'positive';
			case 'Science of Discworld':
				return 'primary';
			case 'Miscellaneous':
				return 'secondary';
			default:
				return 'dark';
		}
	}

	function getSubsectionTextColor(subsection: string) {
		switch (subsection) {
			case 'dark':
				return 'white';
			case 'faded':
				return 'white';
			case 'grey':
				return 'white';
			case 'info':
				return 'white';
			case 'negative':
				return 'white';
			case 'orange':
				return 'black';
			case 'positive':
				return 'white';
			case 'primary':
				return 'white';
			case 'secondary':
				return 'white';
			case 'warning':
				return 'black';
			default:
				return 'white';
		}
	}

	function getDetailsRowByID(id: number) {
		const index = discworldBooksDetailsJSON.findIndex((book: DiscworldBookDetails) => book.id === id);
		if (index !== -1) {
			return discworldBooksDetailsJSON[index];
		}
		return null;
	}

	function getCoverImage(id: number) {
		// console.log('id: ', id);
		return coverImages[`/src/assets/covers/discworld/dw-${id.toString().padStart(2, '0')}.jpg`]?.default;
	}

	async function onSelection() {
		// console.log('details: ', details);
		await nextTick();

		booksRead.value = selected.value.map((row: DiscworldBookMain) => row.id);
		// console.log('booksRead: ', booksRead.value);
		// console.log('selected.value: ', selected.value);
	}

	function onRowClick(row: any) {
		row.expand = !row.expand;
		// console.log('row: ', row);
		// localStorage.setItem('my-store', '{"hello": "hello"}')
	}
</script>
