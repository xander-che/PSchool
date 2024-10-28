import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

	async getUser(email: UserDto['email']) {
		return this.UserModel.findOne({ email }).exec();
	}

	async createUser(dto: UserDto) {
		if (this.getUser(dto.email) == null) {
			const salt = genSaltSync(10);
			const newUser = new this.UserModel({
				email: dto.email,
				pwdHash: hashSync(dto.pwd, salt),
			});
			return newUser.save();
		}
	}

	async updateUser(dto: UserDto) {
		if (this.getUser(dto.email) != null) {
			this.UserModel.updateOne(dto).exec();
		}
	}

	async deleteUser(email: UserDto['email']) {
		if (this.getUser(email) != null) {
			this.UserModel.deleteOne({ email }).exec();
		}
	}
}
