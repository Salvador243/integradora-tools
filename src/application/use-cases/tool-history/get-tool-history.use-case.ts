import { Inject, Injectable } from '@nestjs/common';
import { ToolHistory } from '../../../domain/entities/tool-history/tool-history.entity';
import type { ToolHistoryRepository } from '../../../domain/repositories/tool-history.repository';

@Injectable()
export class GetToolHistoryUseCase {
	constructor(
		@Inject('ToolHistoryRepository')
		private readonly toolHistoryRepository: ToolHistoryRepository,
	) {}

	async execute(
		page: number,
		limit: number,
	): Promise<{ toolHistory: ToolHistory[]; total: number }> {
		return this.toolHistoryRepository.findAll(page, limit);
	}
}
