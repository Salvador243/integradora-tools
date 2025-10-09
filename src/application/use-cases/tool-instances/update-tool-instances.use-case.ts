import { Inject, Injectable } from '@nestjs/common';
import { ToolInstances } from '../../../domain/entities/tool-instances/tool-instances.entity';
import type { ToolInstancesRepository } from '../../../domain/repositories/tool-instances.repository';

@Injectable()
export class UpdateToolInstancesUseCase {
	constructor(
		@Inject('ToolInstancesRepository')
		private readonly toolInstancesRepository: ToolInstancesRepository,
	) {}

	async execute(
		uuid: string,
		updateData: Partial<
			Omit<ToolInstances, 'uuid' | 'createdAt' | 'updatedAt'>
		>,
	): Promise<ToolInstances> {
		const toolInstance = await this.toolInstancesRepository.update(
			uuid,
			updateData,
		);
		if (!toolInstance) {
			throw new Error('Instancia de herramienta no encontrada');
		}
		return toolInstance;
	}
}
