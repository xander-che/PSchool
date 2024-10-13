import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './rooms/configs/mongo.config';

@Module({
	imports: [
		ScheduleModule,
		RoomsModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/simple-airbnb-db'),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
