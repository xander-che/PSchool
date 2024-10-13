import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { FindRoomDto } from 'src/rooms/dto/find-room.dto';
import { disconnect } from 'mongoose';

const testDto: FindRoomDto = {
	id: '001',
	type: 'suite',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let createdType: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/rooms/create (POST)', async (done) => {
		return request(app.getHttpServer())
			.post('/rooms/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body.id;
				expect(createdId).toBeDefined();
				done();
			});
	});

	it('/rooms/:id (DELETE)', () => {
		return request(app.getHttpServer())
			.delete('/rooms/' + createdId)
			.expect(200);
	});

	afterAll(() => {
		disconnect();
	});
});
