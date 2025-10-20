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
		
		// Reload with relations
		const toolTypeWithRelations = await this.toolTypesRepository.findOne({
			where: { uuid: savedToolType.uuid },
			relations: ['category', 'garage'],
		});
		
		if (!toolTypeWithRelations) {
			throw new Error('Failed to load created tool type');
		}
		
		return new ToolTypes(
			toolTypeWithRelations.uuid,
			toolTypeWithRelations.code,
			toolTypeWithRelations.name,
			toolTypeWithRelations.categoryId,
			toolTypeWithRelations.status,
			toolTypeWithRelations.image,
			toolTypeWithRelations.garageId,
			toolTypeWithRelations.createdAt,
			toolTypeWithRelations.updatedAt,
			toolTypeWithRelations.category?.code,
			toolTypeWithRelations.category?.name,
			toolTypeWithRelations.garage?.code ?? null,
			toolTypeWithRelations.garage?.name ?? null,
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
			relations: ['category', 'garage'],
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
					entity.category?.code,
					entity.category?.name,
					entity.garage?.code ?? null,
					entity.garage?.name ?? null,
				),
		);

		return {
			toolTypes,
			total,
		};
	}

	async findAllGroupedByCategory(): Promise<any> {
		const toolTypeEntities = await this.toolTypesRepository.find({
			order: { name: 'ASC' },
			relations: ['category', 'garage'],
		});

		// Agrupar por categoría
		const categoryMap = new Map<string, any>();

		toolTypeEntities.forEach((entity) => {
			if (!entity.category) return;

			const categoryId = entity.category.uuid;

			if (!categoryMap.has(categoryId)) {
				categoryMap.set(categoryId, {
					uuid: entity.category.uuid,
					code: entity.category.code,
					name: entity.category.name,
					status: entity.category.status,
					toolTypes: [],
				});
			}

			const category = categoryMap.get(categoryId);
			category.toolTypes.push(
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
					entity.category?.code,
					entity.category?.name,
					entity.garage?.code ?? null,
					entity.garage?.name ?? null,
				),
			);
		});

		const categories = Array.from(categoryMap.values());
		const total = toolTypeEntities.length;

		return {
			categories,
			total,
		};
	}

	async findByUuid(uuid: string): Promise<ToolTypes | null> {
		const toolTypeEntity = await this.toolTypesRepository.findOne({
			where: { uuid },
			relations: ['category', 'garage'],
		});
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
			toolTypeEntity.category?.code,
			toolTypeEntity.category?.name,
			toolTypeEntity.garage?.code ?? null,
			toolTypeEntity.garage?.name ?? null,
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
		await this.toolTypesRepository.save(updatedToolTypeEntity);
		
		// Reload with relations
		const updatedToolType = await this.toolTypesRepository.findOne({
			where: { uuid },
			relations: ['category', 'garage'],
		});
		
		if (!updatedToolType) return null;
		
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
			updatedToolType.category?.code,
			updatedToolType.category?.name,
			updatedToolType.garage?.code ?? null,
			updatedToolType.garage?.name ?? null,
		);
	}

	async delete(uuid: string): Promise<boolean> {
		const deleted = await this.toolTypesRepository.delete(uuid);
		return deleted.affected ? deleted.affected > 0 : false;
	}
}
