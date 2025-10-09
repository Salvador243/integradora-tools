import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolInstancesEntity } from '../../infrastructure/database/entities/tool-instances.entity';
import { ToolInstancesController } from '../controllers/tool-instances/tool-instances.controller';
import { TOOL_INSTANCES_USE_CASES } from '../../application/use-cases/tool-instances/exports-provider.use-case';
import { ApiToolInstancesRepository } from '../../infrastructure/repositories/api-tool-instances.repository';

@Module({
	imports: [TypeOrmModule.forFeature([ToolInstancesEntity])],
	controllers: [ToolInstancesController],
	providers: [
		// Use Cases
		...TOOL_INSTANCES_USE_CASES,
		// Repository
		{
			provide: 'ToolInstancesRepository',
			useClass: ApiToolInstancesRepository,
		},
	],
})
export class ToolInstancesModule {}
