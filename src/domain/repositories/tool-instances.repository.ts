import { ToolInstances } from '../entities/tool-instances/tool-instances.entity';

export interface ToolInstancesRepository {
	create(
		toolInstance: Omit<ToolInstances, 'uuid' | 'createdAt' | 'updatedAt'>,
	): Promise<ToolInstances>;

	findAll(
		page: number,
		limit: number,
	): Promise<{ toolInstances: ToolInstances[]; total: number }>;

	findByUuid(uuid: string): Promise<ToolInstances | null>;

	update(
		uuid: string,
		toolInstance: Partial<
			Omit<ToolInstances, 'uuid' | 'createdAt' | 'updatedAt'>
		>,
	): Promise<ToolInstances | null>;

	delete(uuid: string): Promise<boolean>;
}
