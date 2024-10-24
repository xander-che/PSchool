import { IsDate, IsString } from 'class-validator';

export class FindEntryDto {
	@IsString()
	id: string;

	@IsDate()
	date: Date;
}
