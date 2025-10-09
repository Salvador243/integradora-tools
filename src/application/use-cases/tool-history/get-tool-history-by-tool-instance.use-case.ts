import { Inject, Injectable } from '@nestjs/common';
import { ToolHistory } from '../../../domain/entities/tool-history/tool-history.entity';
import type { ToolHistoryRepository } from '../../../domain/repositories/tool-history.repository';

@Injectable()
export class GetToolHistoryByToolInstanceUseCase {
	constructor(
		@Inject('ToolHistoryRepository')
		private readonly toolHistoryRepository: ToolHistoryRepository,
	) {}

	async execute(toolInstanceId: string): Promise<ToolHistory[]> {
		return this.toolHistoryRepository.findByToolInstanceId(toolInstanceId);
	}
}
