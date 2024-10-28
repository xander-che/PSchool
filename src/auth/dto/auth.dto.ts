import { IsString } from 'class-validator';

export class AuthDto {
	@IsString()
	email: string;

	@IsString()
	pwd: string;
}
