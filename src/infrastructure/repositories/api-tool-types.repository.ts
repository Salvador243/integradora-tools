import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolTypesRepository } from '../../domain/repositories/tool-types.repository';
import { ToolTypes } from '../../domain/entities/tool-types/tool-types.entity';
import { ToolTypesEntity } from '../database/entities/tool-types.entity';

@Injectable()
export class ApiToolTypesRepository implements ToolTypesRepository {
	constructor(
		@InjectRepository(ToolTypesEntity)
		private readonly toolTypesRepository: Repository<ToolTypesEntity>,
	) {}

	async create(toolType: Omit<ToolTypes, 'uuid' | 'createdAt' | 'updatedAt'>): Promise<ToolTypes> {
		const toolTypeEntity = this.toolTypesRepository.create({
			code: toolType.code,
			name: toolType.name,
			categoryId: toolType.categoryId,
			status: toolType.status,
			image: toolType.image ?? undefined,
			garageId: toolType.garageId ?? undefined,
		});
		const savedToolType = await this.toolTypesRepository.save(toolTypeEntity);
		return new ToolTypes(
			savedToolType.uuid,
			savedToolType.code,
			savedToolType.name,
			savedToolType.categoryId,
			savedToolType.status,
			savedToolType.image,
			savedToolType.garageId,
			savedToolType.createdAt,
			savedToolType.updatedAt,
		);
	}

	async findAll(
		page: number,
		limit: number,
	): Promise<{ toolTypes: ToolTypes[]; total: number }> {
		const skip = (page - 1) * limit;
		const [toolTypeEntities, total] = await this.toolTypesRepository.findAndCount({
			skip,
			take: limit,
			order: { name: 'ASC' },
		});

		const toolTypes = toolTypeEntities.map(
			(entity) =>
				new ToolTypes(
					entity.uuid,
					entity.code,
					entity.name,
					entity.categoryId,
					entity.status,
					entity.image,
					entity.garageId,
					entity.createdAt,
					entity.updatedAt,
				),
		);

		return {
			toolTypes,
			total,
		};
	}

	async findByUuid(uuid: string): Promise<ToolTypes | null> {
		const toolTypeEntity = await this.toolTypesRepository.findOneBy({ uuid });
		if (!toolTypeEntity) return null;
		return new ToolTypes(
			toolTypeEntity.uuid,
			toolTypeEntity.code,
			toolTypeEntity.name,
			toolTypeEntity.categoryId,
			toolTypeEntity.status,
			toolTypeEntity.image,
			toolTypeEntity.garageId,
			toolTypeEntity.createdAt,
			toolTypeEntity.updatedAt,
		);
	}

	async update(
		uuid: string,
		toolType: Partial<Omit<ToolTypes, 'uuid' | 'createdAt' | 'updatedAt'>>,
	): Promise<ToolTypes | null> {
		const toolTypeEntity = await this.toolTypesRepository.findOneBy({ uuid });
		if (!toolTypeEntity) return null;

		const updateData: Partial<ToolTypesEntity> = {};
		if (toolType.code !== undefined) updateData.code = toolType.code;
		if (toolType.name !== undefined) updateData.name = toolType.name;
		if (toolType.categoryId !== undefined) updateData.categoryId = toolType.categoryId;
		if (toolType.status !== undefined) updateData.status = toolType.status;
		if (toolType.image !== undefined)
			updateData.image = toolType.image ?? undefined;
		if (toolType.garageId !== undefined)
			updateData.garageId = toolType.garageId ?? undefined;

		const updatedToolTypeEntity = this.toolTypesRepository.merge(
			toolTypeEntity,
			updateData,
		);
		const updatedToolType = await this.toolTypesRepository.save(updatedToolTypeEntity);
		return new ToolTypes(
			updatedToolType.uuid,
			updatedToolType.code,
			updatedToolType.name,
			updatedToolType.categoryId,
			updatedToolType.status,
			updatedToolType.image,
			updatedToolType.garageId,
			updatedToolType.createdAt,
			updatedToolType.updatedAt,
		);
	}

	async delete(uuid: string): Promise<boolean> {
		const deleted = await this.toolTypesRepository.delete(uuid);
		return deleted.affected ? deleted.affected > 0 : false;
	}
}
