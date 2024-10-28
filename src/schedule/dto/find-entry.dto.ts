import { IsDate, IsString } from 'class-validator';
import { DateUnit } from 'mongoose';

export class FindEntryDto {
	@IsString()
	id: string;

	@IsString()
	roomId: string;

	@IsDate()
	date: Date;

	month: DateUnit = 'month';
}
