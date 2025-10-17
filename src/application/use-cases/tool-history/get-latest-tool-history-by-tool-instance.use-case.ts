import { Inject, Injectable } from '@nestjs/common';
import { ToolHistory } from '../../../domain/entities/tool-history/tool-history.entity';
import type { ToolHistoryRepository } from '../../../domain/repositories/tool-history.repository';

@Injectable()
export class GetLatestToolHistoryByToolInstanceUseCase {
	constructor(
		@Inject('ToolHistoryRepository')
		private readonly toolHistoryRepository: ToolHistoryRepository,
	) {}

	async execute(toolInstanceId: string): Promise<ToolHistory | null> {
		return this.toolHistoryRepository.findLatestByToolInstanceId(
			toolInstanceId,
		);
	}
}
