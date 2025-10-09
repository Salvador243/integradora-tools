import { Provider } from '@nestjs/common';
import { CreateToolTypesUseCase } from './create-tool-types.use-case';
import { DeleteToolTypesUseCase } from './delete-tool-types.use-case';
import { GetToolTypesByUuidUseCase } from './get-tool-types-by-uuid.use-case';
import { UpdateToolTypesUseCase } from './update-tool-types.use-case';
import { GetToolTypesUseCase } from './get-tool-types.use-case';

export const TOOL_TYPES_USE_CASES: Provider[] = [
	CreateToolTypesUseCase,
	DeleteToolTypesUseCase,
	GetToolTypesByUuidUseCase,
	UpdateToolTypesUseCase,
	GetToolTypesUseCase,
];
