import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from './models/schedule.model';
import { Model } from 'mongoose';
import { FindEntryDto } from './dto/find-entry.dto';

@Injectable()
export class ScheduleService {
	constructor(@InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>) {}

	async getEntry(dto: FindEntryDto) {
		return this.scheduleModel.findOne(dto);
	}

	async createEntry(dto: FindEntryDto) {
		if (this.getEntry(dto) == null) {
			const newEntry = new this.scheduleModel(dto);
			return newEntry.save();
		}
	}

	async updateEntry(dto: FindEntryDto) {
		this.scheduleModel.updateOne(dto);
	}

	async deleteEntry(dto: FindEntryDto) {
		this.scheduleModel.deleteOne(dto);
	}
}
