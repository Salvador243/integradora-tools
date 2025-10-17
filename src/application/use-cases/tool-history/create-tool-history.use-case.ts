import { Inject, Injectable } from '@nestjs/common';
import { ToolHistory } from '../../../domain/entities/tool-history/tool-history.entity';
import type { ToolHistoryRepository } from '../../../domain/repositories/tool-history.repository';

@Injectable()
export class CreateToolHistoryUseCase {
	constructor(
		@Inject('ToolHistoryRepository')
		private readonly toolHistoryRepository: ToolHistoryRepository,
	) {}

	async execute(
		toolInstanceId: string,
		garageId: string,
		userAssigned: string,
		conditionId: string,
		fechaEvento: Date,
		tipoEvento: string,
	): Promise<ToolHistory> {
		return await this.toolHistoryRepository.create({
			toolInstanceId,
			garageId,
			userAssigned,
			conditionId,
			fechaEvento,
			tipoEvento,
		});
	}
}
