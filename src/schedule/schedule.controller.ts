import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Schedule } from './models/schedule.model';
import { FindEntryDto } from './dto/find-entry.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Post('create')
	async create(@Body() dto: Omit<Schedule, 'id'>) {}

	@Get(':id')
	async get(@Param() id: string) {}

	@Patch('id')
	async patch(@Param('id') id: string, @Body() dto: Schedule) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindEntryDto) {}
}
