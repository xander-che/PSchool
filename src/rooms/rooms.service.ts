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
		return this.roomsModel.findOne({ id });
	}

	async updateById(id: string) {
		this.roomsModel.updateOne({ id });
	}

	async deleteById(id: string) {
		this.roomsModel.deleteOne({ id });
	}
}
