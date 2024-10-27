import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from './models/schedule.model';
import { Model } from 'mongoose';
import { FindEntryDto } from './dto/find-entry.dto';

@Injectable()
export class ScheduleService {
	constructor(@InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>) {}

	async getEntry(id: FindEntryDto['roomId'], date: FindEntryDto['date']) {
		return this.scheduleModel.findOne({ id, date });
	}

	async createEntry(dto: Schedule) {
		if (this.getEntry(dto.id, dto.bookingDate) == null) {
			const newEntry = new this.scheduleModel(dto);
			return newEntry.save();
		}
	}

	async updateEntry(id: FindEntryDto['roomId'], date: FindEntryDto['date']) {
		return this.scheduleModel.updateOne({ id, date });
	}

	async deleteEntry(id: FindEntryDto['roomId'], date: FindEntryDto['date']) {
		return this.scheduleModel.deleteOne({ id, date });
	}

	async getMonthStatistic(dto: FindEntryDto) {
		return this.scheduleModel
			.aggregate([
				{
					$match: {
						bookingDate: dto.month,
					},
				},
				{
					$count: dto.roomId,
				},
			])
			.exec();
	}
}
