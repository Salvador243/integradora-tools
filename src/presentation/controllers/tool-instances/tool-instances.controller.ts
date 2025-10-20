import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	Param,
	Post,
	Put,
	Query,
	Res,
	ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateToolInstancesUseCase } from '../../../application/use-cases/tool-instances/create-tool-instances.use-case';
import { DeleteToolInstancesUseCase } from '../../../application/use-cases/tool-instances/delete-tool-instances.use-case';
import { GetToolInstancesByUuidUseCase } from '../../../application/use-cases/tool-instances/get-tool-instances-by-uuid.use-case';
import { GetToolInstancesByToolTypeUseCase } from '../../../application/use-cases/tool-instances/get-tool-instances-by-tool-type.use-case';
import { GetToolInstancesUseCase } from '../../../application/use-cases/tool-instances/get-tool-instances.use-case';
import { UpdateToolInstancesUseCase } from '../../../application/use-cases/tool-instances/update-tool-instances.use-case';
import { ExportToolInstancesToExcelUseCase } from '../../../application/use-cases/tool-instances/export-tool-instances-to-excel.use-case';
import { CreateToolInstancesDto } from '../../dtos/tool-instances/create-tool-instances.dto';

@Controller('tool-instances')
export class ToolInstancesController {
	constructor(
		private readonly createToolInstancesUseCase: CreateToolInstancesUseCase,
		private readonly getToolInstancesUseCase: GetToolInstancesUseCase,
		private readonly getToolInstancesByUuidUseCase: GetToolInstancesByUuidUseCase,
		private readonly getToolInstancesByToolTypeUseCase: GetToolInstancesByToolTypeUseCase,
		private readonly updateToolInstancesUseCase: UpdateToolInstancesUseCase,
		private readonly deleteToolInstancesUseCase: DeleteToolInstancesUseCase,
		private readonly exportToolInstancesToExcelUseCase: ExportToolInstancesToExcelUseCase,
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
		@Query('limit') limit: string = '10000',
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

	@Get('get-by-tool-type/:toolTypeId')
	async findByToolType(
		@Param('toolTypeId') toolTypeId: string,
		@Query('page') page?: string,
		@Query('limit') limit?: string,
	) {
		// Si no se pasan page y limit, traer todos los registros
		const pageNumber = page ? parseInt(page, 10) : 1;
		const limitNumber = limit ? parseInt(limit, 10) : 999999;

		const result = await this.getToolInstancesByToolTypeUseCase.execute(
			toolTypeId,
			pageNumber,
			limitNumber,
		);
		return {
			success: true,
			message: 'Instancias de herramienta obtenidas exitosamente por tipo',
			data: result,
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

	@Get('export-to-excel')
	@Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
	@Header('Content-Disposition', 'attachment; filename="herramientas.xlsx"')
	async exportToExcel(@Res() res: Response) {
		try {
			const excelBuffer = await this.exportToolInstancesToExcelUseCase.execute();
			res.send(excelBuffer);
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Error al generar el archivo Excel',
				error: error.message,
			});
		}
	}
}
