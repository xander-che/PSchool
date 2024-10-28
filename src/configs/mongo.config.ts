import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
	return {
		uri: `mongodb://${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}@mongo:27017/simple-airbnb-db`,
	};
};
