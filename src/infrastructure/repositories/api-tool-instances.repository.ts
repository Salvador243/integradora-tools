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
		return new ToolInstances(
			savedToolInstance.uuid,
			savedToolInstance.toolTypeId,
			savedToolInstance.serialCode,
			savedToolInstance.garageId,
			savedToolInstance.conditionId,
			savedToolInstance.status,
			savedToolInstance.lastAssignedUser,
			savedToolInstance.createdAt,
			savedToolInstance.updatedAt,
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
				),
		);

		return {
			toolInstances,
			total,
		};
	}

	async findByUuid(uuid: string): Promise<ToolInstances | null> {
		const toolInstanceEntity =
			await this.toolInstancesRepository.findOneBy({ uuid });
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
		);
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
		const updatedToolInstance = await this.toolInstancesRepository.save(
			updatedToolInstanceEntity,
		);
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
		);
	}

	async delete(uuid: string): Promise<boolean> {
		const deleted = await this.toolInstancesRepository.delete(uuid);
		return deleted.affected ? deleted.affected > 0 : false;
	}
}
