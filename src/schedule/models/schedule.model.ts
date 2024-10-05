import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
	@Prop({ require: true })
	id: number;

	@Prop({ require: true })
	bookingDate: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
