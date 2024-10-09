import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FindRoomDto } from 'src/rooms/dto/find-room.dto';

const testDto: FindRoomDto = {
	id: '001',
	type: '1 room',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/rooms/createRoom (POST)', async (done) => {
		return request(app.getHttpServer())
			.post('/rooms/createRoom')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body.id;
				expect(createdId).toBeDefined();
				done();
			});
	});
});
