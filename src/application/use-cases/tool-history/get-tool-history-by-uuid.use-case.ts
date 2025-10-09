import { Inject, Injectable } from '@nestjs/common';
import { ToolHistory } from '../../../domain/entities/tool-history/tool-history.entity';
import type { ToolHistoryRepository } from '../../../domain/repositories/tool-history.repository';

@Injectable()
export class GetToolHistoryByUuidUseCase {
	constructor(
		@Inject('ToolHistoryRepository')
		private readonly toolHistoryRepository: ToolHistoryRepository,
	) {}

	async execute(uuid: string): Promise<ToolHistory | null> {
		const toolHistory = await this.toolHistoryRepository.findByUuid(uuid);
		if (!toolHistory) {
			throw new Error('Historial no encontrado');
		}
		return toolHistory;
	}
}
