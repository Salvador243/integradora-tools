import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolInstancesRepository } from '../../domain/repositories/tool-instances.repository';
import { ToolInstances } from '../../domain/entities/tool-instances/tool-instances.entity';
import { ToolInstancesEntity } from '../database/entities/tool-instances.entity';

@Injectable()
export class ApiToolInstancesRepository implements ToolInstancesRepository {
	constructor(
		@InjectRepository(ToolInstancesEntity)
		private readonly toolInstancesRepository: Repository<ToolInstancesEntity>,
	) {}

	async create(
		toolInstance: Omit<ToolInstances, 'uuid' | 'createdAt' | 'updatedAt'>,
	): Promise<ToolInstances> {
		const toolInstanceEntity = this.toolInstancesRepository.create({
			toolTypeId: toolInstance.toolTypeId,
			serialCode: toolInstance.serialCode,
			garageId: toolInstance.garageId,
			conditionId: toolInstance.conditionId,
			status: toolInstance.status,
			lastAssignedUser: toolInstance.lastAssignedUser ?? undefined,
		});
		const savedToolInstance =
			await this.toolInstancesRepository.save(toolInstanceEntity);
		
		// Reload with relations
		const toolInstanceWithRelations = await this.toolInstancesRepository.findOne({
			where: { uuid: savedToolInstance.uuid },
			relations: ['toolType', 'toolType.category', 'garage', 'condition'],
		});
		
		if (!toolInstanceWithRelations) {
			throw new Error('Failed to load created tool instance');
		}
		
		return new ToolInstances(
			toolInstanceWithRelations.uuid,
			toolInstanceWithRelations.toolTypeId,
			toolInstanceWithRelations.serialCode,
			toolInstanceWithRelations.garageId,
			toolInstanceWithRelations.conditionId,
			toolInstanceWithRelations.status,
			toolInstanceWithRelations.lastAssignedUser,
			toolInstanceWithRelations.createdAt,
			toolInstanceWithRelations.updatedAt,
			toolInstanceWithRelations.toolType?.code,
			toolInstanceWithRelations.toolType?.name,
			toolInstanceWithRelations.garage?.code,
			toolInstanceWithRelations.garage?.name,
			toolInstanceWithRelations.condition?.code,
			toolInstanceWithRelations.condition?.description,
		);
	}

	async findAll(
		page: number,
		limit: number,
	): Promise<{ toolInstances: ToolInstances[]; total: number }> {
		const skip = (page - 1) * limit;
		const [toolInstanceEntities, total] =
			await this.toolInstancesRepository.findAndCount({
				skip,
				take: limit,
				order: { createdAt: 'DESC' },
				relations: ['toolType', 'toolType.category', 'garage', 'condition'],
			});

		const toolInstances = toolInstanceEntities.map(
			(entity) =>
				new ToolInstances(
					entity.uuid,
					entity.toolTypeId,
					entity.serialCode,
					entity.garageId,
					entity.conditionId,
					entity.status,
					entity.lastAssignedUser,
					entity.createdAt,
					entity.updatedAt,
					entity.toolType?.code,
					entity.toolType?.name,
					entity.garage?.code,
					entity.garage?.name,
					entity.condition?.code,
					entity.condition?.description,
				),
		);

		return {
			toolInstances,
			total,
		};
	}

	async findByUuid(uuid: string): Promise<ToolInstances | null> {
		const toolInstanceEntity = await this.toolInstancesRepository.findOne({
			where: { uuid },
			relations: ['toolType', 'toolType.category', 'garage', 'condition'],
		});
		if (!toolInstanceEntity) return null;
		return new ToolInstances(
			toolInstanceEntity.uuid,
			toolInstanceEntity.toolTypeId,
			toolInstanceEntity.serialCode,
			toolInstanceEntity.garageId,
			toolInstanceEntity.conditionId,
			toolInstanceEntity.status,
			toolInstanceEntity.lastAssignedUser,
			toolInstanceEntity.createdAt,
			toolInstanceEntity.updatedAt,
			toolInstanceEntity.toolType?.code,
			toolInstanceEntity.toolType?.name,
			toolInstanceEntity.garage?.code,
			toolInstanceEntity.garage?.name,
			toolInstanceEntity.condition?.code,
			toolInstanceEntity.condition?.description,
		);
	}

	async findByToolTypeId(
		toolTypeId: string,
		page: number,
		limit: number,
	): Promise<{ toolInstances: ToolInstances[]; total: number }> {
		const skip = (page - 1) * limit;
		const [toolInstanceEntities, total] =
			await this.toolInstancesRepository.findAndCount({
				where: { toolTypeId },
				skip,
				take: limit,
				order: { createdAt: 'DESC' },
				relations: ['toolType', 'toolType.category', 'garage', 'condition'],
			});

		const toolInstances = toolInstanceEntities.map(
			(entity) =>
				new ToolInstances(
					entity.uuid,
					entity.toolTypeId,
					entity.serialCode,
					entity.garageId,
					entity.conditionId,
					entity.status,
					entity.lastAssignedUser,
					entity.createdAt,
					entity.updatedAt,
					entity.toolType?.code,
					entity.toolType?.name,
					entity.garage?.code,
					entity.garage?.name,
					entity.condition?.code,
					entity.condition?.description,
				),
		);

		return {
			toolInstances,
			total,
		};
	}

	async update(
		uuid: string,
		toolInstance: Partial<
			Omit<ToolInstances, 'uuid' | 'createdAt' | 'updatedAt'>
		>,
	): Promise<ToolInstances | null> {
		const toolInstanceEntity =
			await this.toolInstancesRepository.findOneBy({ uuid });
		if (!toolInstanceEntity) return null;

		const updateData: Partial<ToolInstancesEntity> = {};
		if (toolInstance.toolTypeId !== undefined)
			updateData.toolTypeId = toolInstance.toolTypeId;
		if (toolInstance.serialCode !== undefined)
			updateData.serialCode = toolInstance.serialCode;
		if (toolInstance.garageId !== undefined)
			updateData.garageId = toolInstance.garageId;
		if (toolInstance.conditionId !== undefined)
			updateData.conditionId = toolInstance.conditionId;
		if (toolInstance.status !== undefined)
			updateData.status = toolInstance.status;
		if (toolInstance.lastAssignedUser !== undefined)
			updateData.lastAssignedUser =
				toolInstance.lastAssignedUser ?? undefined;

		const updatedToolInstanceEntity = this.toolInstancesRepository.merge(
			toolInstanceEntity,
			updateData,
		);
		await this.toolInstancesRepository.save(updatedToolInstanceEntity);
		
		// Reload with relations
		const updatedToolInstance = await this.toolInstancesRepository.findOne({
			where: { uuid },
			relations: ['toolType', 'toolType.category', 'garage', 'condition'],
		});
		
		if (!updatedToolInstance) return null;
		
		return new ToolInstances(
			updatedToolInstance.uuid,
			updatedToolInstance.toolTypeId,
			updatedToolInstance.serialCode,
			updatedToolInstance.garageId,
			updatedToolInstance.conditionId,
			updatedToolInstance.status,
			updatedToolInstance.lastAssignedUser,
			updatedToolInstance.createdAt,
			updatedToolInstance.updatedAt,
			updatedToolInstance.toolType?.code,
			updatedToolInstance.toolType?.name,
			updatedToolInstance.garage?.code,
			updatedToolInstance.garage?.name,
			updatedToolInstance.condition?.code,
			updatedToolInstance.condition?.description,
		);
	}

	async delete(uuid: string): Promise<boolean> {
		const deleted = await this.toolInstancesRepository.delete(uuid);
		return deleted.affected ? deleted.affected > 0 : false;
	}
}
