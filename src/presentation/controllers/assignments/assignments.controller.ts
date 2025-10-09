import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	ValidationPipe,
} from '@nestjs/common';
import { CreateAssignmentsUseCase } from '../../../application/use-cases/assignments/create-assignments.use-case';
import { DeleteAssignmentsUseCase } from '../../../application/use-cases/assignments/delete-assignments.use-case';
import { GetAssignmentsByUuidUseCase } from '../../../application/use-cases/assignments/get-assignments-by-uuid.use-case';
import { GetAssignmentsUseCase } from '../../../application/use-cases/assignments/get-assignments.use-case';
import { UpdateAssignmentsUseCase } from '../../../application/use-cases/assignments/update-assignments.use-case';
import { CreateAssignmentsDto } from '../../dtos/assignments/create-assignments.dto';

@Controller('assignments')
export class AssignmentsController {
	constructor(
		private readonly createAssignmentsUseCase: CreateAssignmentsUseCase,
		private readonly getAssignmentsUseCase: GetAssignmentsUseCase,
		private readonly getAssignmentsByUuidUseCase: GetAssignmentsByUuidUseCase,
		private readonly updateAssignmentsUseCase: UpdateAssignmentsUseCase,
		private readonly deleteAssignmentsUseCase: DeleteAssignmentsUseCase,
	) {}

	@Post('create')
	async create(
		@Body(ValidationPipe) createAssignmentsDto: CreateAssignmentsDto,
	) {
		const assignment = await this.createAssignmentsUseCase.execute(
			createAssignmentsDto.toolInstanceId,
			createAssignmentsDto.userAssigned,
			createAssignmentsDto.fechaSalida,
			createAssignmentsDto.conditionIdSalida,
			createAssignmentsDto.fechaRegreso,
			createAssignmentsDto.conditionIdRegreso,
			createAssignmentsDto.status ?? 'open',
		);
		return {
			success: true,
			message: 'Asignación creada exitosamente',
			data: assignment,
		};
	}

	@Get('get-all')
	async findAll(
		@Query('page') page: string = '1',
		@Query('limit') limit: string = '10',
	) {
		const pageNumber = parseInt(page, 10) || 1;
		const limitNumber = parseInt(limit, 10) || 10;

		const assignments = await this.getAssignmentsUseCase.execute(
			pageNumber,
			limitNumber,
		);
		return {
			success: true,
			message: 'Asignaciones obtenidas exitosamente',
			data: assignments,
		};
	}

	@Get('get-by-uuid/:uuid')
	async findOne(@Param('uuid') uuid: string) {
		const assignment = await this.getAssignmentsByUuidUseCase.execute(uuid);
		return {
			success: true,
			message: 'Asignación obtenida exitosamente',
			data: assignment,
		};
	}

	@Put('update-assignments/:uuid')
	async update(
		@Param('uuid') uuid: string,
		@Body() updateAssignmentsDto: CreateAssignmentsDto,
	) {
		const assignment = await this.updateAssignmentsUseCase.execute(
			uuid,
			updateAssignmentsDto,
		);
		return {
			success: true,
			message: 'Asignación actualizada exitosamente',
			data: assignment,
		};
	}

	@Delete('delete-assignments/:uuid')
	async delete(@Param('uuid') uuid: string) {
		const assignment = await this.deleteAssignmentsUseCase.execute(uuid);
		return {
			success: true,
			message: 'Asignación eliminada exitosamente',
			data: assignment,
		};
	}
}
