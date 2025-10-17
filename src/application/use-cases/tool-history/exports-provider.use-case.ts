import { Provider } from '@nestjs/common';
import { CreateToolHistoryUseCase } from './create-tool-history.use-case';
import { GetToolHistoryByToolInstanceUseCase } from './get-tool-history-by-tool-instance.use-case';
import { GetToolHistoryByUuidUseCase } from './get-tool-history-by-uuid.use-case';
import { GetToolHistoryUseCase } from './get-tool-history.use-case';
import { GetLatestToolHistoryByToolInstanceUseCase } from './get-latest-tool-history-by-tool-instance.use-case';

export const TOOL_HISTORY_USE_CASES: Provider[] = [
	CreateToolHistoryUseCase,
	GetToolHistoryByToolInstanceUseCase,
	GetToolHistoryByUuidUseCase,
	GetToolHistoryUseCase,
	GetLatestToolHistoryByToolInstanceUseCase,
];
