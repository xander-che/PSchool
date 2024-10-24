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
import { Rooms } from './models/rooms.model';
import { FindRoomDto } from './dto/find-room.dto';
import { RoomsService } from './rooms.service';
import { ROOM_NOT_FOUND } from './rooms.constants';

@Controller('rooms')
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}
	// @Post('create')
	// async create(@Body() dto: Omit<Rooms, 'id'>) {}

	@Post('create')
	async create(@Body() dto: Rooms) {
		return this.roomsService.createRoom(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const findedId = await this.roomsService.getById(id);
		if (!findedId) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return findedId;
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: Rooms) {
		const updatedDoc = await this.roomsService.updateById(id);
		if (!updatedDoc) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return updatedDoc;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.roomsService.deleteById(id);
		if (!deletedDoc) {
			throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindRoomDto) {}
}
