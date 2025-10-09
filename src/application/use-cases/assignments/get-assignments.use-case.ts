import { Inject, Injectable } from '@nestjs/common';
import { Assignments } from '../../../domain/entities/assignments/assignments.entity';
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
	): Promise<{ assignments: Assignments[]; total: number }> {
		return this.assignmentsRepository.findAll(page, limit);
	}
}
