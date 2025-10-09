import { Inject, Injectable } from '@nestjs/common';
import type { ToolTypesRepository } from '../../../domain/repositories/tool-types.repository';

@Injectable()
export class DeleteToolTypesUseCase {
	constructor(
		@Inject('ToolTypesRepository')
		private readonly toolTypesRepository: ToolTypesRepository,
	) {}

	async execute(uuid: string): Promise<boolean> {
		const deleted = await this.toolTypesRepository.delete(uuid);
		if (!deleted) {
			throw new Error('Tipo de herramienta no encontrado');
		}
		return deleted;
	}
}
