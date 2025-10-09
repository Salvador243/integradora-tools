import { Inject, Injectable } from '@nestjs/common';
import { ToolTypes } from '../../../domain/entities/tool-types/tool-types.entity';
import type { ToolTypesRepository } from '../../../domain/repositories/tool-types.repository';

@Injectable()
export class GetToolTypesByUuidUseCase {
	constructor(
		@Inject('ToolTypesRepository')
		private readonly toolTypesRepository: ToolTypesRepository,
	) {}

	async execute(uuid: string): Promise<ToolTypes | null> {
		const toolType = await this.toolTypesRepository.findByUuid(uuid);
		if (!toolType) {
			throw new Error('Tipo de herramienta no encontrado');
		}
		return toolType;
	}
}
