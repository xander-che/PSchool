import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema()
export class AuthModel {
	@Prop({ require: true, unique: true })
	email: string;

	@Prop({ require: true })
	pwdHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
