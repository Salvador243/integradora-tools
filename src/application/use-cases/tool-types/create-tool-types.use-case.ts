import { Inject, Injectable } from '@nestjs/common';
import { ToolTypes } from '../../../domain/entities/tool-types/tool-types.entity';
import type { ToolTypesRepository } from '../../../domain/repositories/tool-types.repository';

@Injectable()
export class CreateToolTypesUseCase {
	constructor(
		@Inject('ToolTypesRepository')
		private readonly toolTypesRepository: ToolTypesRepository,
	) {}

	async execute(
		code: string,
		name: string,
		categoryId: number,
		status: string = 'active',
		image?: string,
		garageId?: number,
	): Promise<ToolTypes> {
		// Validar que el código no exista
		const existingToolTypes = await this.toolTypesRepository.findAll(1, 1000);
		const codeExists = existingToolTypes.toolTypes.some((toolType) => toolType.code === code);

		if (codeExists) {
			throw new Error('Ya existe un tipo de herramienta con este código');
		}

		return await this.toolTypesRepository.create({
			code,
			name,
			categoryId,
			status,
			image: image || null,
			garageId: garageId || null,
		});
	}
}
