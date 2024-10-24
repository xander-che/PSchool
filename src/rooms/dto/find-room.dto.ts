import { IsString } from 'class-validator';

export class FindRoomDto {
	@IsString()
	id: string;

	@IsString()
	type: string;
}
