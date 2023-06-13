// Book Model

import { Model } from 'pinia-orm';
import { Attr, BelongsTo, HasManyBy, Num, Str, Uid } from 'pinia-orm/dist/decorators';

import Category from './Category';
import Series from './Series';
import Subseries from './Subseries';

export default class Book extends Model {
	// entity is a required property for all models.
	static entity = 'books';

	@Uid() declare id: string;
	@Num(0) declare number: number;
	@Str('') declare titleEn: string;
	@Str('') declare titleEs: string;
	@Str('') declare titleDe: string;
	@Num(0) declare year: number;
	@Attr(null) declare seriesId: number | null;
	@Attr(null) declare subseriesId: number[] | null;
	@Attr(null) declare categoryId: number | null;

	@BelongsTo(() => Series, 'seriesId') declare series: Series | null;
	@HasManyBy(() => Subseries, 'subseriesId') declare subseries: Subseries | null;
	@BelongsTo(() => Category, 'categoryId') declare categories: Category | null;
}
