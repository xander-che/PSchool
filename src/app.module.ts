import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsController } from './rooms/rooms.controller';
import { ScheduleController } from './schedule/schedule.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		ScheduleModule,
		RoomsModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot('mongodb://localhost/simple-airbnb-db'),
	],
	controllers: [AppController, RoomsController, ScheduleController],
	providers: [AppService],
})
export class AppModule {}
