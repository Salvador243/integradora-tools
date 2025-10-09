import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
	ToolTypesEntity,
	ToolInstancesEntity,
	AssignmentsEntity,
	ToolHistoryEntity,
} from './entities';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_DATABASE'),
				entities: [
					ToolTypesEntity,
					ToolInstancesEntity,
					AssignmentsEntity,
					ToolHistoryEntity,
				],
				synchronize: configService.get<string>('NODE_ENV') !== 'production',
				logging: configService.get<string>('NODE_ENV') === 'development',
			}),
		}),
		TypeOrmModule.forFeature([
			ToolTypesEntity,
			ToolInstancesEntity,
			AssignmentsEntity,
			ToolHistoryEntity,
		]),
	],
	exports: [TypeOrmModule],
})
export class DatabaseModule {}
