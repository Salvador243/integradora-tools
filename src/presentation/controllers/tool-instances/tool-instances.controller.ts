import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	ValidationPipe,
} from '@nestjs/common';
import { CreateToolInstancesUseCase } from '../../../application/use-cases/tool-instances/create-tool-instances.use-case';
import { DeleteToolInstancesUseCase } from '../../../application/use-cases/tool-instances/delete-tool-instances.use-case';
import { GetToolInstancesByUuidUseCase } from '../../../application/use-cases/tool-instances/get-tool-instances-by-uuid.use-case';
import { GetToolInstancesUseCase } from '../../../application/use-cases/tool-instances/get-tool-instances.use-case';
import { UpdateToolInstancesUseCase } from '../../../application/use-cases/tool-instances/update-tool-instances.use-case';
import { CreateToolInstancesDto } from '../../dtos/tool-instances/create-tool-instances.dto';

@Controller('tool-instances')
export class ToolInstancesController {
	constructor(
		private readonly createToolInstancesUseCase: CreateToolInstancesUseCase,
		private readonly getToolInstancesUseCase: GetToolInstancesUseCase,
		private readonly getToolInstancesByUuidUseCase: GetToolInstancesByUuidUseCase,
		private readonly updateToolInstancesUseCase: UpdateToolInstancesUseCase,
		private readonly deleteToolInstancesUseCase: DeleteToolInstancesUseCase,
	) {}

	@Post('create')
	async create(
		@Body(ValidationPipe) createToolInstancesDto: CreateToolInstancesDto,
	) {
		const toolInstance = await this.createToolInstancesUseCase.execute(
			createToolInstancesDto.toolTypeId,
			createToolInstancesDto.serialCode,
			createToolInstancesDto.garageId,
			createToolInstancesDto.conditionId,
			createToolInstancesDto.status ?? 'available',
			createToolInstancesDto.lastAssignedUser,
		);
		return {
			success: true,
			message: 'Instancia de herramienta creada exitosamente',
			data: toolInstance,
		};
	}

	@Get('get-all')
	async findAll(
		@Query('page') page: string = '1',
		@Query('limit') limit: string = '10',
	) {
		const pageNumber = parseInt(page, 10) || 1;
		const limitNumber = parseInt(limit, 10) || 10;

		const toolInstances = await this.getToolInstancesUseCase.execute(
			pageNumber,
			limitNumber,
		);
		return {
			success: true,
			message: 'Instancias de herramienta obtenidas exitosamente',
			data: toolInstances,
		};
	}

	@Get('get-by-uuid/:uuid')
	async findOne(@Param('uuid') uuid: string) {
		const toolInstance =
			await this.getToolInstancesByUuidUseCase.execute(uuid);
		return {
			success: true,
			message: 'Instancia de herramienta obtenida exitosamente',
			data: toolInstance,
		};
	}

	@Put('update-tool-instances/:uuid')
	async update(
		@Param('uuid') uuid: string,
		@Body() updateToolInstancesDto: CreateToolInstancesDto,
	) {
		const toolInstance = await this.updateToolInstancesUseCase.execute(
			uuid,
			updateToolInstancesDto,
		);
		return {
			success: true,
			message: 'Instancia de herramienta actualizada exitosamente',
			data: toolInstance,
		};
	}

	@Delete('delete-tool-instances/:uuid')
	async delete(@Param('uuid') uuid: string) {
		const toolInstance =
			await this.deleteToolInstancesUseCase.execute(uuid);
		return {
			success: true,
			message: 'Instancia de herramienta eliminada exitosamente',
			data: toolInstance,
		};
	}
}
