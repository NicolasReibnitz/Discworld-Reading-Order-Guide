// Serie Model

import { Model } from 'pinia-orm';
import { Attr, HasMany, Str } from 'pinia-orm/dist/decorators';

import Book from './Book';
import Subseries from './Subseries';

export default class Series extends Model {
	// entity is a required property for all models.
	static entity = 'series';

	@Attr(null) declare id: number | null;
	@Str('') declare title: string;
	@Str('') declare colorBg: string;
	@Str('') declare colorText: string;
	@HasMany(() => Book, 'seriesId') declare books: Book[];
	@HasMany(() => Subseries, 'seriesId') declare subseries: Subseries[];
}
