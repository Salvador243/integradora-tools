import { Assignments } from '../entities/assignments/assignments.entity';

export interface AssignmentsRepository {
	create(
		assignment: Omit<Assignments, 'uuid' | 'createdAt'>,
	): Promise<Assignments>;

	findAll(
		page: number,
		limit: number,
	): Promise<{ assignments: Assignments[]; total: number }>;

	findByUuid(uuid: string): Promise<Assignments | null>;

	update(
		uuid: string,
		assignment: Partial<Omit<Assignments, 'uuid' | 'createdAt'>>,
	): Promise<Assignments | null>;

	delete(uuid: string): Promise<boolean>;
}
