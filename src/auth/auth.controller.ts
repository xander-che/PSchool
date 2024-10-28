import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: UserDto) {
		const oldUser = await this.userService.getUser(dto.email);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.userService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { email, pwd }: AuthDto) {
		const user = await this.authService.validateUser(email, pwd);
		return this.authService.login(user.email);
	}
}
