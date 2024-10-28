import { IsNumber, IsString } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class UserDto {
	@IsString()
	email: string;

	@IsString()
	pwd: string;

	@IsString()
	name: string;

	@IsNumber()
	phone: number;

	@IsString()
	role: Role[];
}
