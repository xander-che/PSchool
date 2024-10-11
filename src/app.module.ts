import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		ScheduleModule,
		RoomsModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot('mongodb://localhost:27017/simple-airbnb-db'),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
