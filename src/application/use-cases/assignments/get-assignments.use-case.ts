import { Inject, Injectable } from '@nestjs/common';
import { AssignmentsWithRelations } from '../../../domain/entities/assignments/assignments-with-relations.entity';
import type { AssignmentsRepository } from '../../../domain/repositories/assignments.repository';

@Injectable()
export class GetAssignmentsUseCase {
	constructor(
		@Inject('AssignmentsRepository')
		private readonly assignmentsRepository: AssignmentsRepository,
	) {}

	async execute(
		page: number,
		limit: number,
	): Promise<{ assignments: AssignmentsWithRelations[]; total: number }> {
		return this.assignmentsRepository.findAll(page, limit);
	}
}
