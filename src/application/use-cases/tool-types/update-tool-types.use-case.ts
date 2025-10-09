import { Inject, Injectable } from '@nestjs/common';
import { ToolTypes } from '../../../domain/entities/tool-types/tool-types.entity';
import type { ToolTypesRepository } from '../../../domain/repositories/tool-types.repository';

@Injectable()
export class UpdateToolTypesUseCase {
	constructor(
		@Inject('ToolTypesRepository')
		private readonly toolTypesRepository: ToolTypesRepository,
	) {}

	async execute(
		uuid: string,
		updateData: Partial<Omit<ToolTypes, 'uuid' | 'createdAt' | 'updatedAt'>>,
	): Promise<ToolTypes> {
		const toolType = await this.toolTypesRepository.update(uuid, updateData);
		if (!toolType) {
			throw new Error('Tipo de herramienta no encontrado');
		}
		return toolType;
	}
}
