import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Schedule } from './models/schedule.model';
import { FindEntryDto } from './dto/find-entry.dto';
import { ScheduleService } from './schedule.service';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { BOOKONG_NOT_FOUND, BOOKONG_NOT_SUCCESS } from './schedule.constants';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Post('create')
	async create(@Body() dto: Schedule) {
		const createdBooking = await this.scheduleService.createEntry(dto);
		if (!createdBooking) {
			throw new HttpException(BOOKONG_NOT_SUCCESS, HttpStatus.NOT_FOUND);
		}
		return createdBooking;
	}

	@Get(':id')
	async get(@Param('id') id: string, @Param('date') date: Date) {
		const findedBooking = await this.scheduleService.getEntry(id, date);
		if (!findedBooking) {
			throw new HttpException(BOOKONG_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return findedBooking;
	}

	@Patch(':id, :date')
	async patch(@Param('id') id: string, @Param('date') date: Date) {
		const findedBooking = await this.scheduleService.getEntry(id, date);
		if (!findedBooking) {
			throw new HttpException(BOOKONG_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		const updatedDoc = await this.scheduleService.updateEntry(id, date);
		return updatedDoc;
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Param('date') date: Date) {
		const deletedBooking = await this.scheduleService.deleteEntry(id, date);
		if (!deletedBooking) {
			throw new HttpException(BOOKONG_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Roles(Role.Admin)
	async find(@Body() dto: FindEntryDto) {
		return await this.scheduleService.getMonthStatistic(dto);
	}
}
