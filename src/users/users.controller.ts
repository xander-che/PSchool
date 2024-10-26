import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Delete,
	HttpCode,
	HttpException,
	HttpStatus,
	Patch,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Post('create')
	async create(@Body() dto: UserDto) {
		return this.userService.createUser(dto);
	}

	@Get(':email')
	async get(@Param('email') email: string) {
		const findedUser = await this.userService.getUser(email);
		if (!findedUser) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return findedUser;
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':email')
	async patch(@Param('email') @Body() dto: UserDto) {
		const updatedUser = await this.userService.updateUser(dto);
		if (updatedUser == null) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return updatedUser;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':email')
	async delete(@Param('email') email: string) {
		const deletedUser = await this.userService.deleteUser(email);
		if (deletedUser == null) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async find(@Body() dto: UserDto) {}
}
