import { Provider } from '@nestjs/common';
import { CreateToolInstancesUseCase } from './create-tool-instances.use-case';
import { DeleteToolInstancesUseCase } from './delete-tool-instances.use-case';
import { GetToolInstancesByUuidUseCase } from './get-tool-instances-by-uuid.use-case';
import { GetToolInstancesByToolTypeUseCase } from './get-tool-instances-by-tool-type.use-case';
import { UpdateToolInstancesUseCase } from './update-tool-instances.use-case';
import { GetToolInstancesUseCase } from './get-tool-instances.use-case';
import { ExportToolInstancesToExcelUseCase } from './export-tool-instances-to-excel.use-case';

export const TOOL_INSTANCES_USE_CASES: Provider[] = [
	CreateToolInstancesUseCase,
	DeleteToolInstancesUseCase,
	GetToolInstancesByUuidUseCase,
	GetToolInstancesByToolTypeUseCase,
	UpdateToolInstancesUseCase,
	GetToolInstancesUseCase,
	ExportToolInstancesToExcelUseCase,
];
