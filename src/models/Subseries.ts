// Subseries Model

import { Model } from 'pinia-orm';
import { Attr, BelongsTo, Str } from 'pinia-orm/dist/decorators';

import Series from './Series';

export default class Subseries extends Model {
	// entity is a required property for all models.
	static entity = 'subseries';

	@Attr(null) declare id: number | null;
	@Str('') declare title: string;
	@Attr(null) declare seriesId: number | null;

	@BelongsTo(() => Series, 'seriesId') declare series: Series | null;
}
