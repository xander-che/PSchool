import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rooms, RoomsDocument } from './models/rooms.model';
import { Model } from 'mongoose';
import { FindRoomDto } from './dto/find-room.dto';

@Injectable()
export class RoomsService {
	constructor(@InjectModel(Rooms.name) private roomsModel: Model<RoomsDocument>) {}

	async createRoom(dto: FindRoomDto) {
		const newRoom = new this.roomsModel(dto);
		return newRoom.save();
	}

	async getById(id: string) {
		return this.roomsModel.findById(id);
	}

	async updateById(id: string, dto: FindRoomDto) {
		return this.roomsModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async deleteById(id: string) {
		return this.roomsModel.findByIdAndDelete(id);
	}
}
