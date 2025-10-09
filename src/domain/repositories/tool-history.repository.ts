import { ToolHistory } from '../entities/tool-history/tool-history.entity';

export interface ToolHistoryRepository {
	create(toolHistory: Omit<ToolHistory, 'uuid'>): Promise<ToolHistory>;

	findAll(
		page: number,
		limit: number,
	): Promise<{ toolHistory: ToolHistory[]; total: number }>;

	findByToolInstanceId(
		toolInstanceId: string,
	): Promise<ToolHistory[]>;

	findByUuid(uuid: string): Promise<ToolHistory | null>;
}
