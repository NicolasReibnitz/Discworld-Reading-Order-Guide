// Category Model

import { Model } from 'pinia-orm';
import { HasMany, Str, Uid } from 'pinia-orm/dist/decorators';

import Book from './Book';

export default class Category extends Model {
	// entity is a required property for all models.
	static entity = 'categories';

	@Uid() declare id: string;
	@Str('') declare title: string;

	@HasMany(() => Book, 'categoryId') declare books: Book[];
}
