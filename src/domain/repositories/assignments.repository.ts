import { Assignments } from '../entities/assignments/assignments.entity';
import { AssignmentsWithRelations } from '../entities/assignments/assignments-with-relations.entity';

export interface AssignmentsRepository {
	create(
		assignment: Omit<Assignments, 'uuid' | 'createdAt'>,
	): Promise<Assignments>;

	findAll(
		page: number,
		limit: number,
	): Promise<{ assignments: AssignmentsWithRelations[]; total: number }>;

	findByUuid(uuid: string): Promise<Assignments | null>;

	update(
		uuid: string,
		assignment: Partial<Omit<Assignments, 'uuid' | 'createdAt'>>,
	): Promise<Assignments | null>;

	delete(uuid: string): Promise<boolean>;
}
