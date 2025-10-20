import { Inject, Injectable } from '@nestjs/common';
import { ToolTypes } from '../../../domain/entities/tool-types/tool-types.entity';
import type { ToolTypesRepository } from '../../../domain/repositories/tool-types.repository';

@Injectable()
export class GetToolTypesUseCase {
	constructor(
		@Inject('ToolTypesRepository')
		private readonly toolTypesRepository: ToolTypesRepository,
	) {}

	async execute(
		page: number,
		limit: number,
	): Promise<{ toolTypes: ToolTypes[]; total: number }> {
		return this.toolTypesRepository.findAll(page, limit);
	}

	async executeGroupedByCategory(): Promise<any> {
		return this.toolTypesRepository.findAllGroupedByCategory();
	}
}
