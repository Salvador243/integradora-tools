import { Inject, Injectable } from '@nestjs/common';
import type { AssignmentsRepository } from '../../../domain/repositories/assignments.repository';

@Injectable()
export class DeleteAssignmentsUseCase {
	constructor(
		@Inject('AssignmentsRepository')
		private readonly assignmentsRepository: AssignmentsRepository,
	) {}

	async execute(uuid: string): Promise<boolean> {
		const deleted = await this.assignmentsRepository.delete(uuid);
		if (!deleted) {
			throw new Error('Asignación no encontrada');
		}
		return deleted;
	}
}
