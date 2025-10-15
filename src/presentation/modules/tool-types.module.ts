import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolTypesEntity } from '../../infrastructure/database/entities/tool-types.entity';
import { CategoryEntity } from '../../infrastructure/database/entities/category.entity';
import { GarageEntity } from '../../infrastructure/database/entities/garage.entity';
import { ToolTypesController } from '../controllers/tool-types/tool-types.controller';
import { TOOL_TYPES_USE_CASES } from '../../application/use-cases/tool-types/exports-provider.use-case';
import { ApiToolTypesRepository } from '../../infrastructure/repositories/api-tool-types.repository';

@Module({
	imports: [TypeOrmModule.forFeature([ToolTypesEntity, CategoryEntity, GarageEntity])],
	controllers: [ToolTypesController],
	providers: [
		// Use Cases
		...TOOL_TYPES_USE_CASES,
		// Repository
		{
			provide: 'ToolTypesRepository',
			useClass: ApiToolTypesRepository,
		},
	],
})
export class ToolTypesModule {}
