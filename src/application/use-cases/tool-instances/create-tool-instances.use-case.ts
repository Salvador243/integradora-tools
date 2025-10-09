import { Inject, Injectable } from '@nestjs/common';
import { ToolInstances } from '../../../domain/entities/tool-instances/tool-instances.entity';
import type { ToolInstancesRepository } from '../../../domain/repositories/tool-instances.repository';

@Injectable()
export class CreateToolInstancesUseCase {
	constructor(
		@Inject('ToolInstancesRepository')
		private readonly toolInstancesRepository: ToolInstancesRepository,
	) {}

	async execute(
		toolTypeId: string,
		serialCode: string,
		garageId: number,
		conditionId: number,
		status: string = 'available',
		lastAssignedUser?: string,
	): Promise<ToolInstances> {
		// Validar que el código serial no exista
		const existingToolInstances =
			await this.toolInstancesRepository.findAll(1, 1000);
		const serialCodeExists = existingToolInstances.toolInstances.some(
			(toolInstance) => toolInstance.serialCode === serialCode,
		);

		if (serialCodeExists) {
			throw new Error('Ya existe una instancia con este código serial');
		}

		return await this.toolInstancesRepository.create({
			toolTypeId,
			serialCode,
			garageId,
			conditionId,
			status,
			lastAssignedUser: lastAssignedUser || null,
		});
	}
}
