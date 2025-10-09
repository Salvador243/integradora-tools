import { Inject, Injectable } from '@nestjs/common';
import { ToolInstances } from '../../../domain/entities/tool-instances/tool-instances.entity';
import type { ToolInstancesRepository } from '../../../domain/repositories/tool-instances.repository';

@Injectable()
export class GetToolInstancesByUuidUseCase {
	constructor(
		@Inject('ToolInstancesRepository')
		private readonly toolInstancesRepository: ToolInstancesRepository,
	) {}

	async execute(uuid: string): Promise<ToolInstances | null> {
		const toolInstance = await this.toolInstancesRepository.findByUuid(uuid);
		if (!toolInstance) {
			throw new Error('Instancia de herramienta no encontrada');
		}
		return toolInstance;
	}
}
