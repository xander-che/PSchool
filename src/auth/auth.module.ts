import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthModel, AuthSchema } from './models/auth.model';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User, UserSchema } from 'src/users/models/user.model';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [
		MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule,
		ConfigModule,
	],
})
export class AuthModule {}
