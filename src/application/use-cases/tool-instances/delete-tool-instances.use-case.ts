import { Inject, Injectable } from '@nestjs/common';
import type { ToolInstancesRepository } from '../../../domain/repositories/tool-instances.repository';

@Injectable()
export class DeleteToolInstancesUseCase {
	constructor(
		@Inject('ToolInstancesRepository')
		private readonly toolInstancesRepository: ToolInstancesRepository,
	) {}

	async execute(uuid: string): Promise<boolean> {
		const deleted = await this.toolInstancesRepository.delete(uuid);
		if (!deleted) {
			throw new Error('Instancia de herramienta no encontrada');
		}
		return deleted;
	}
}
