import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({ require: true, unique: true })
	email: string;

	@Prop({ require: true })
	pwdHash: string;

	@Prop({ require: true })
	name: string;

	@Prop({ require: true })
	phone: number;

	@Prop({ require: true })
	role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
