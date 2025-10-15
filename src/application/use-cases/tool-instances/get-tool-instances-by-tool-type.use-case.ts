import { Inject, Injectable } from '@nestjs/common';
import { ToolInstances } from '../../../domain/entities/tool-instances/tool-instances.entity';
import type { ToolInstancesRepository } from '../../../domain/repositories/tool-instances.repository';

@Injectable()
export class GetToolInstancesByToolTypeUseCase {
	constructor(
		@Inject('ToolInstancesRepository')
		private readonly toolInstancesRepository: ToolInstancesRepository,
	) {}

	async execute(
		toolTypeId: string,
		page: number = 1,
		limit: number = 10000,
	): Promise<{ toolInstances: ToolInstances[]; total: number }> {
		return await this.toolInstancesRepository.findByToolTypeId(
			toolTypeId,
			page,
			limit,
		);
	}
}
