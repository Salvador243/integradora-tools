import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	ValidationPipe,
} from '@nestjs/common';
import { CreateToolHistoryUseCase } from '../../../application/use-cases/tool-history/create-tool-history.use-case';
import { GetToolHistoryByToolInstanceUseCase } from '../../../application/use-cases/tool-history/get-tool-history-by-tool-instance.use-case';
import { GetToolHistoryByUuidUseCase } from '../../../application/use-cases/tool-history/get-tool-history-by-uuid.use-case';
import { GetToolHistoryUseCase } from '../../../application/use-cases/tool-history/get-tool-history.use-case';
import { CreateToolHistoryDto } from '../../dtos/tool-history/create-tool-history.dto';

@Controller('tool-history')
export class ToolHistoryController {
	constructor(
		private readonly createToolHistoryUseCase: CreateToolHistoryUseCase,
		private readonly getToolHistoryUseCase: GetToolHistoryUseCase,
		private readonly getToolHistoryByToolInstanceUseCase: GetToolHistoryByToolInstanceUseCase,
		private readonly getToolHistoryByUuidUseCase: GetToolHistoryByUuidUseCase,
	) {}

	@Post('create')
	async create(
		@Body(ValidationPipe) createToolHistoryDto: CreateToolHistoryDto,
	) {
		const toolHistory = await this.createToolHistoryUseCase.execute(
			createToolHistoryDto.toolInstanceId,
			createToolHistoryDto.garageId,
			createToolHistoryDto.userAssigned,
			createToolHistoryDto.conditionId,
			createToolHistoryDto.fechaEvento,
			createToolHistoryDto.tipoEvento,
		);
		return {
			success: true,
			message: 'Historial creado exitosamente',
			data: toolHistory,
		};
	}

	@Get('get-all')
	async findAll(
		@Query('page') page: string = '1',
		@Query('limit') limit: string = '10',
	) {
		const pageNumber = parseInt(page, 10) || 1;
		const limitNumber = parseInt(limit, 10) || 10;

		const toolHistory = await this.getToolHistoryUseCase.execute(
			pageNumber,
			limitNumber,
		);
		return {
			success: true,
			message: 'Historial obtenido exitosamente',
			data: toolHistory,
		};
	}

	@Get('get-by-tool-instance/:toolInstanceId')
	async findByToolInstance(@Param('toolInstanceId') toolInstanceId: string) {
		const toolHistory =
			await this.getToolHistoryByToolInstanceUseCase.execute(toolInstanceId);
		return {
			success: true,
			message: 'Historial de la instancia obtenido exitosamente',
			data: toolHistory,
		};
	}

	@Get('get-by-uuid/:uuid')
	async findOne(@Param('uuid') uuid: string) {
		const toolHistory = await this.getToolHistoryByUuidUseCase.execute(uuid);
		return {
			success: true,
			message: 'Historial obtenido exitosamente',
			data: toolHistory,
		};
	}
}
