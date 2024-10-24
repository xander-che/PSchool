import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomsDocument = HydratedDocument<Rooms>;

@Schema()
export class Rooms {
	@Prop({ require: true, unique: true })
	id: string;

	@Prop({ require: true })
	type: string;
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
