import { Provider } from '@nestjs/common';
import { CreateAssignmentsUseCase } from './create-assignments.use-case';
import { DeleteAssignmentsUseCase } from './delete-assignments.use-case';
import { GetAssignmentsByUuidUseCase } from './get-assignments-by-uuid.use-case';
import { UpdateAssignmentsUseCase } from './update-assignments.use-case';
import { GetAssignmentsUseCase } from './get-assignments.use-case';

export const ASSIGNMENTS_USE_CASES: Provider[] = [
	CreateAssignmentsUseCase,
	DeleteAssignmentsUseCase,
	GetAssignmentsByUuidUseCase,
	UpdateAssignmentsUseCase,
	GetAssignmentsUseCase,
];
