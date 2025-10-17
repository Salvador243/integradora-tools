import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsEntity } from '../../infrastructure/database/entities/assignments.entity';
import { AssignmentsController } from '../controllers/assignments/assignments.controller';
import { ASSIGNMENTS_USE_CASES } from '../../application/use-cases/assignments/exports-provider.use-case';
import { ApiAssignmentsRepository } from '../../infrastructure/repositories/api-assignments.repository';
import { ToolInstancesModule } from './tool-instances.module';
import { ToolHistoryModule } from './tool-history.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([AssignmentsEntity]),
		ToolInstancesModule, // Importar para usar UpdateToolInstancesUseCase
		ToolHistoryModule, // Importar para usar CreateToolHistoryUseCase
	],
	controllers: [AssignmentsController],
	providers: [
		// Use Cases
		...ASSIGNMENTS_USE_CASES,
		// Repository
		{
			provide: 'AssignmentsRepository',
			useClass: ApiAssignmentsRepository,
		},
	],
})
export class AssignmentsModule {}
