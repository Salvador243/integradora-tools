import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentsRepository } from '../../domain/repositories/assignments.repository';
import { Assignments } from '../../domain/entities/assignments/assignments.entity';
import { AssignmentsEntity } from '../database/entities/assignments.entity';

@Injectable()
export class ApiAssignmentsRepository implements AssignmentsRepository {
	constructor(
		@InjectRepository(AssignmentsEntity)
		private readonly assignmentsRepository: Repository<AssignmentsEntity>,
	) {}

	async create(
		assignment: Omit<Assignments, 'uuid' | 'createdAt'>,
	): Promise<Assignments> {
		const assignmentEntity = this.assignmentsRepository.create({
			toolInstanceId: assignment.toolInstanceId,
			userAssigned: assignment.userAssigned,
			fechaSalida: assignment.fechaSalida,
			fechaRegreso: assignment.fechaRegreso ?? undefined,
			conditionIdSalida: assignment.conditionIdSalida,
			conditionIdRegreso: assignment.conditionIdRegreso ?? undefined,
			status: assignment.status,
		});
		const savedAssignment =
			await this.assignmentsRepository.save(assignmentEntity);
		return new Assignments(
			savedAssignment.uuid,
			savedAssignment.toolInstanceId,
			savedAssignment.userAssigned,
			savedAssignment.fechaSalida,
			savedAssignment.fechaRegreso,
			savedAssignment.conditionIdSalida,
			savedAssignment.conditionIdRegreso,
			savedAssignment.status,
			savedAssignment.createdAt,
		);
	}

	async findAll(
		page: number,
		limit: number,
	): Promise<{ assignments: Assignments[]; total: number }> {
		const skip = (page - 1) * limit;
		const [assignmentEntities, total] =
			await this.assignmentsRepository.findAndCount({
				skip,
				take: limit,
				order: { createdAt: 'DESC' },
			});

		const assignments = assignmentEntities.map(
			(entity) =>
				new Assignments(
					entity.uuid,
					entity.toolInstanceId,
					entity.userAssigned,
					entity.fechaSalida,
					entity.fechaRegreso,
					entity.conditionIdSalida,
					entity.conditionIdRegreso,
					entity.status,
					entity.createdAt,
				),
		);

		return {
			assignments,
			total,
		};
	}

	async findByUuid(uuid: string): Promise<Assignments | null> {
		const assignmentEntity = await this.assignmentsRepository.findOneBy({
			uuid,
		});
		if (!assignmentEntity) return null;
		return new Assignments(
			assignmentEntity.uuid,
			assignmentEntity.toolInstanceId,
			assignmentEntity.userAssigned,
			assignmentEntity.fechaSalida,
			assignmentEntity.fechaRegreso,
			assignmentEntity.conditionIdSalida,
			assignmentEntity.conditionIdRegreso,
			assignmentEntity.status,
			assignmentEntity.createdAt,
		);
	}

	async update(
		uuid: string,
		assignment: Partial<Omit<Assignments, 'uuid' | 'createdAt'>>,
	): Promise<Assignments | null> {
		const assignmentEntity = await this.assignmentsRepository.findOneBy({
			uuid,
		});
		if (!assignmentEntity) return null;

		const updateData: Partial<AssignmentsEntity> = {};
		if (assignment.toolInstanceId !== undefined)
			updateData.toolInstanceId = assignment.toolInstanceId;
		if (assignment.userAssigned !== undefined)
			updateData.userAssigned = assignment.userAssigned;
		if (assignment.fechaSalida !== undefined)
			updateData.fechaSalida = assignment.fechaSalida;
		if (assignment.fechaRegreso !== undefined)
			updateData.fechaRegreso = assignment.fechaRegreso ?? undefined;
		if (assignment.conditionIdSalida !== undefined)
			updateData.conditionIdSalida = assignment.conditionIdSalida;
		if (assignment.conditionIdRegreso !== undefined)
			updateData.conditionIdRegreso =
				assignment.conditionIdRegreso ?? undefined;
		if (assignment.status !== undefined)
			updateData.status = assignment.status;

		const updatedAssignmentEntity = this.assignmentsRepository.merge(
			assignmentEntity,
			updateData,
		);
		const updatedAssignment = await this.assignmentsRepository.save(
			updatedAssignmentEntity,
		);
		return new Assignments(
			updatedAssignment.uuid,
			updatedAssignment.toolInstanceId,
			updatedAssignment.userAssigned,
			updatedAssignment.fechaSalida,
			updatedAssignment.fechaRegreso,
			updatedAssignment.conditionIdSalida,
			updatedAssignment.conditionIdRegreso,
			updatedAssignment.status,
			updatedAssignment.createdAt,
		);
	}

	async delete(uuid: string): Promise<boolean> {
		const deleted = await this.assignmentsRepository.delete(uuid);
		return deleted.affected ? deleted.affected > 0 : false;
	}
}
