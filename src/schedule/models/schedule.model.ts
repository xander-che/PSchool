import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Rooms } from 'src/rooms/models/rooms.model';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
	@Prop({ require: true })
	id: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: Rooms.name })
	roomId: Rooms;

	@Prop({ require: true })
	bookingDate: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
