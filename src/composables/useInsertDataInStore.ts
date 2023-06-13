import { useRepo } from 'pinia-orm';

import discworldBooksJSON from '../data/discworld-books.json';
import discworldCategoriesJSON from '../data/discworld-categories.json';
import discworldSeriesJSON from '../data/discworld-series.json';
import discworldSubseriesJSON from '../data/discworld-subseries.json';
import Book from '../models/Book';
import Category from '../models/Category';
import Series from '../models/Series';
import Subseries from '../models/Subseries';

function useInsertDataInStore() {
	const seriesRepo = useRepo(Series);
	const subseriesRepo = useRepo(Subseries);
	const categoriesRepo = useRepo(Category);
	const booksRepo = useRepo(Book);

	function insertBooks() {
		const books = booksRepo.insert(discworldBooksJSON);

		return books;
	}

	function insertSeries() {
		const series = seriesRepo.insert(discworldSeriesJSON);

		return series;
	}

	function insertSubseries() {
		const subseries = subseriesRepo.insert(discworldSubseriesJSON);

		return subseries;
	}

	function insertCategories() {
		const categories = categoriesRepo.insert(discworldCategoriesJSON);

		return categories;
	}

	return { insertSeries, insertSubseries, insertCategories, insertBooks };
}

export default useInsertDataInStore;
