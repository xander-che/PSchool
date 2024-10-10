import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Rooms } from './models/rooms.model';
import { FindRoomDto } from './dto/find-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
	@Post('create')
	async create(@Body() dto: Omit<Rooms, 'id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: Rooms) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindRoomDto) {}
}
