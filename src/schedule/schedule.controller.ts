import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Schedule } from './models/schedule.model';
import { FindEntryDto } from './dto/find-entry.dto';

@Controller('schedule')
export class ScheduleController {
	@Post('create')
	async create(@Body() dto: Omit<Schedule, 'id'>) {}

	@Get(':id')
	async get(@Param() id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch('id')
	async patch(@Param('id') id: string, @Body() dto: Schedule) {}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindEntryDto) {}
}
