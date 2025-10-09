import { Inject, Injectable } from '@nestjs/common';
import { Assignments } from '../../../domain/entities/assignments/assignments.entity';
import type { AssignmentsRepository } from '../../../domain/repositories/assignments.repository';

@Injectable()
export class CreateAssignmentsUseCase {
	constructor(
		@Inject('AssignmentsRepository')
		private readonly assignmentsRepository: AssignmentsRepository,
	) {}

	async execute(
		toolInstanceId: string,
		userAssigned: string,
		fechaSalida: Date,
		conditionIdSalida: number,
		fechaRegreso?: Date,
		conditionIdRegreso?: number,
		status: string = 'open',
	): Promise<Assignments> {
		return await this.assignmentsRepository.create({
			toolInstanceId,
			userAssigned,
			fechaSalida,
			fechaRegreso: fechaRegreso || null,
			conditionIdSalida,
			conditionIdRegreso: conditionIdRegreso || null,
			status,
		});
	}
}
