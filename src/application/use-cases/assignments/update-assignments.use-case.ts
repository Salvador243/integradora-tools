import { Inject, Injectable } from '@nestjs/common';
import { Assignments } from '../../../domain/entities/assignments/assignments.entity';
import type { AssignmentsRepository } from '../../../domain/repositories/assignments.repository';

@Injectable()
export class UpdateAssignmentsUseCase {
	constructor(
		@Inject('AssignmentsRepository')
		private readonly assignmentsRepository: AssignmentsRepository,
	) {}

	async execute(
		uuid: string,
		updateData: Partial<Omit<Assignments, 'uuid' | 'createdAt'>>,
	): Promise<Assignments> {
		const assignment = await this.assignmentsRepository.update(
			uuid,
			updateData,
		);
		if (!assignment) {
			throw new Error('Asignación no encontrada');
		}
		return assignment;
	}
}
