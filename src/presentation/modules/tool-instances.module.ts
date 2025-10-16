import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolInstancesEntity } from '../../infrastructure/database/entities/tool-instances.entity';
import { ToolTypesEntity } from '../../infrastructure/database/entities/tool-types.entity';
import { GarageEntity } from '../../infrastructure/database/entities/garage.entity';
import { ConditionEntity } from '../../infrastructure/database/entities/condition.entity';
import { ToolInstancesController } from '../controllers/tool-instances/tool-instances.controller';
import { TOOL_INSTANCES_USE_CASES } from '../../application/use-cases/tool-instances/exports-provider.use-case';
import { ApiToolInstancesRepository } from '../../infrastructure/repositories/api-tool-instances.repository';

@Module({
	imports: [TypeOrmModule.forFeature([ToolInstancesEntity, ToolTypesEntity, GarageEntity, ConditionEntity])],
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
	exports: [
		// Exportar el repositorio y use cases para otros módulos
		'ToolInstancesRepository',
		...TOOL_INSTANCES_USE_CASES,
	],
})
export class ToolInstancesModule {}
