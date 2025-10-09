import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolHistoryEntity } from '../../infrastructure/database/entities/tool-history.entity';
import { ToolHistoryController } from '../controllers/tool-history/tool-history.controller';
import { TOOL_HISTORY_USE_CASES } from '../../application/use-cases/tool-history/exports-provider.use-case';
import { ApiToolHistoryRepository } from '../../infrastructure/repositories/api-tool-history.repository';

@Module({
	imports: [TypeOrmModule.forFeature([ToolHistoryEntity])],
	controllers: [ToolHistoryController],
	providers: [
		// Use Cases
		...TOOL_HISTORY_USE_CASES,
		// Repository
		{
			provide: 'ToolHistoryRepository',
			useClass: ApiToolHistoryRepository,
		},
	],
})
export class ToolHistoryModule {}
