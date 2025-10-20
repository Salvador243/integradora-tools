import { ToolTypes } from '../entities/tool-types/tool-types.entity';

export interface ToolTypesRepository {
	create(toolType: Omit<ToolTypes, 'uuid' | 'createdAt' | 'updatedAt'>): Promise<ToolTypes>;

	findAll(
		page: number,
		limit: number,
	): Promise<{ toolTypes: ToolTypes[]; total: number }>;

	findAllGroupedByCategory(): Promise<any>;

	findByUuid(uuid: string): Promise<ToolTypes | null>;

	update(uuid: string, toolType: Partial<Omit<ToolTypes, 'uuid' | 'createdAt' | 'updatedAt'>>): Promise<ToolTypes | null>;

	delete(uuid: string): Promise<boolean>;
}
