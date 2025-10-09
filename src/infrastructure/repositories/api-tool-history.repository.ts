import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolHistoryRepository } from '../../domain/repositories/tool-history.repository';
import { ToolHistory } from '../../domain/entities/tool-history/tool-history.entity';
import { ToolHistoryEntity } from '../database/entities/tool-history.entity';

@Injectable()
export class ApiToolHistoryRepository implements ToolHistoryRepository {
	constructor(
		@InjectRepository(ToolHistoryEntity)
		private readonly toolHistoryRepository: Repository<ToolHistoryEntity>,
	) {}

	async create(toolHistory: Omit<ToolHistory, 'uuid'>): Promise<ToolHistory> {
		const toolHistoryEntity = this.toolHistoryRepository.create({
			toolInstanceId: toolHistory.toolInstanceId,
			garageId: toolHistory.garageId,
			userAssigned: toolHistory.userAssigned,
			conditionId: toolHistory.conditionId,
			fechaEvento: toolHistory.fechaEvento,
			tipoEvento: toolHistory.tipoEvento,
		});
		const savedToolHistory =
			await this.toolHistoryRepository.save(toolHistoryEntity);
		return new ToolHistory(
			savedToolHistory.uuid,
			savedToolHistory.toolInstanceId,
			savedToolHistory.garageId,
			savedToolHistory.userAssigned,
			savedToolHistory.conditionId,
			savedToolHistory.fechaEvento,
			savedToolHistory.tipoEvento,
		);
	}

	async findAll(
		page: number,
		limit: number,
	): Promise<{ toolHistory: ToolHistory[]; total: number }> {
		const skip = (page - 1) * limit;
		const [toolHistoryEntities, total] =
			await this.toolHistoryRepository.findAndCount({
				skip,
				take: limit,
				order: { fechaEvento: 'DESC' },
			});

		const toolHistory = toolHistoryEntities.map(
			(entity) =>
				new ToolHistory(
					entity.uuid,
					entity.toolInstanceId,
					entity.garageId,
					entity.userAssigned,
					entity.conditionId,
					entity.fechaEvento,
					entity.tipoEvento,
				),
		);

		return {
			toolHistory,
			total,
		};
	}

	async findByToolInstanceId(toolInstanceId: string): Promise<ToolHistory[]> {
		const toolHistoryEntities = await this.toolHistoryRepository.find({
			where: { toolInstanceId },
			order: { fechaEvento: 'DESC' },
		});

		return toolHistoryEntities.map(
			(entity) =>
				new ToolHistory(
					entity.uuid,
					entity.toolInstanceId,
					entity.garageId,
					entity.userAssigned,
					entity.conditionId,
					entity.fechaEvento,
					entity.tipoEvento,
				),
		);
	}

	async findByUuid(uuid: string): Promise<ToolHistory | null> {
		const toolHistoryEntity = await this.toolHistoryRepository.findOneBy({
			uuid,
		});
		if (!toolHistoryEntity) return null;
		return new ToolHistory(
			toolHistoryEntity.uuid,
			toolHistoryEntity.toolInstanceId,
			toolHistoryEntity.garageId,
			toolHistoryEntity.userAssigned,
			toolHistoryEntity.conditionId,
			toolHistoryEntity.fechaEvento,
			toolHistoryEntity.tipoEvento,
		);
	}
}
