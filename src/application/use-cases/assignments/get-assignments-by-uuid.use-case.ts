import { Inject, Injectable } from '@nestjs/common';
import { Assignments } from '../../../domain/entities/assignments/assignments.entity';
import type { AssignmentsRepository } from '../../../domain/repositories/assignments.repository';

@Injectable()
export class GetAssignmentsByUuidUseCase {
	constructor(
		@Inject('AssignmentsRepository')
		private readonly assignmentsRepository: AssignmentsRepository,
	) {}

	async execute(uuid: string): Promise<Assignments | null> {
		const assignment = await this.assignmentsRepository.findByUuid(uuid);
		if (!assignment) {
			throw new Error('Asignación no encontrada');
		}
		return assignment;
	}
}
