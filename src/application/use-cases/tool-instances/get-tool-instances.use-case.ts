import { Inject, Injectable } from '@nestjs/common';
import { ToolInstances } from '../../../domain/entities/tool-instances/tool-instances.entity';
import type { ToolInstancesRepository } from '../../../domain/repositories/tool-instances.repository';

@Injectable()
export class GetToolInstancesUseCase {
	constructor(
		@Inject('ToolInstancesRepository')
		private readonly toolInstancesRepository: ToolInstancesRepository,
	) {}

	async execute(
		page: number,
		limit: number,
	): Promise<{ toolInstances: ToolInstances[]; total: number }> {
		return this.toolInstancesRepository.findAll(page, limit);
	}
}
