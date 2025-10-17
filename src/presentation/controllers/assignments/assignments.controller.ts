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
import { UpdateToolInstancesUseCase } from '../../../application/use-cases/tool-instances/update-tool-instances.use-case';
import { CreateToolHistoryUseCase } from '../../../application/use-cases/tool-history/create-tool-history.use-case';
import { GetToolInstancesByUuidUseCase } from '../../../application/use-cases/tool-instances/get-tool-instances-by-uuid.use-case';
import { GetLatestToolHistoryByToolInstanceUseCase } from '../../../application/use-cases/tool-history/get-latest-tool-history-by-tool-instance.use-case';

@Controller('assignments')
export class AssignmentsController {
	constructor(
		private readonly createAssignmentsUseCase: CreateAssignmentsUseCase,
		private readonly getAssignmentsUseCase: GetAssignmentsUseCase,
		private readonly getAssignmentsByUuidUseCase: GetAssignmentsByUuidUseCase,
		private readonly updateAssignmentsUseCase: UpdateAssignmentsUseCase,
		private readonly deleteAssignmentsUseCase: DeleteAssignmentsUseCase,
		private readonly updateToolInstanceUseCase: UpdateToolInstancesUseCase,
		private readonly createToolHistoryUseCase: CreateToolHistoryUseCase,
		private readonly getToolInstancesByUuidUseCase: GetToolInstancesByUuidUseCase,
		private readonly getLatestToolHistoryByToolInstanceUseCase: GetLatestToolHistoryByToolInstanceUseCase,
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

		try {
			// Obtener la instancia de herramienta para obtener el garageId
			const toolInstance = await this.getToolInstancesByUuidUseCase.execute(
				assignment.toolInstanceId,
			);

			if (!toolInstance) {
				throw new Error('Instancia de herramienta no encontrada');
			}

			// Actualizar el status y lastAssignedUser de la herramienta
			await this.updateToolInstanceUseCase.execute(
				assignment.toolInstanceId,
				{
					lastAssignedUser: assignment.userAssigned,
					status: 'assigned',
				},
			);

			// Crear registro en tool_history
			await this.createToolHistoryUseCase.execute(
				assignment.toolInstanceId,
				toolInstance.garageId,
				assignment.userAssigned,
				assignment.conditionIdSalida,
				assignment.fechaSalida,
				'assigned', // tipo de evento
			);
		} catch (error) {
			console.error(
				'Error al actualizar la instancia de herramienta o crear historial:',
				error,
			);
		}

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

		const result = await this.getAssignmentsUseCase.execute(
			pageNumber,
			limitNumber,
		);

		// Agregar tipo_evento a cada asignación
		const assignmentsWithTipoEvento = await Promise.all(
			result.assignments.map(async (assignment) => {
				const latestHistory =
					await this.getLatestToolHistoryByToolInstanceUseCase.execute(
						assignment.toolInstance.uuid,
					);
				return {
					...assignment,
					tipo_evento: latestHistory?.tipoEvento || null,
				};
			}),
		);

		return {
			success: true,
			message: 'Asignaciones obtenidas exitosamente',
			data: {
				assignments: assignmentsWithTipoEvento,
				total: result.total,
			},
		};
	}

	@Get('get-by-uuid/:uuid')
	async findOne(@Param('uuid') uuid: string) {
		const assignment = await this.getAssignmentsByUuidUseCase.execute(uuid);

		if (!assignment) {
			return {
				success: false,
				message: 'Asignación no encontrada',
				data: null,
			};
		}

		// Agregar tipo_evento del último historial
		const latestHistory =
			await this.getLatestToolHistoryByToolInstanceUseCase.execute(
				assignment.toolInstanceId,
			);

		return {
			success: true,
			message: 'Asignación obtenida exitosamente',
			data: {
				...assignment,
				tipo_evento: latestHistory?.tipoEvento || null,
			},
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

		// Si hay tipo_evento, registrar el evento en el historial
		if (updateAssignmentsDto.tipo_evento) {
			try {
				// Obtener la instancia de herramienta para obtener el garageId
				const toolInstance = await this.getToolInstancesByUuidUseCase.execute(
					assignment.toolInstanceId,
				);

				if (!toolInstance) {
					throw new Error('Instancia de herramienta no encontrada');
				}

				// Actualizar el status de la herramienta según el tipo de evento
				if (updateAssignmentsDto.tipo_evento === 'returned' && updateAssignmentsDto.status === 'closed') {
					// Si es devolución y se cierra, la herramienta vuelve a estar disponible
					await this.updateToolInstanceUseCase.execute(
						assignment.toolInstanceId,
						{
							status: 'available',
						},
					);
				} else if (updateAssignmentsDto.tipo_evento === 'maintenance') {
					// Si va a mantenimiento, actualizar el status
					await this.updateToolInstanceUseCase.execute(
						assignment.toolInstanceId,
						{
							status: 'maintenance',
						},
					);
				}

				// Crear registro en tool_history con el tipo de evento recibido
				await this.createToolHistoryUseCase.execute(
					assignment.toolInstanceId,
					toolInstance.garageId,
					assignment.userAssigned,
					assignment.conditionIdRegreso || assignment.conditionIdSalida,
					updateAssignmentsDto.fechaRegreso || new Date(),
					updateAssignmentsDto.tipo_evento,
				);
			} catch (error) {
				console.error(
					'Error al actualizar la instancia de herramienta o crear historial:',
					error,
				);
			}
		}

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
