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
import { CreateToolTypesUseCase } from '../../../application/use-cases/tool-types/create-tool-types.use-case';
import { DeleteToolTypesUseCase } from '../../../application/use-cases/tool-types/delete-tool-types.use-case';
import { GetToolTypesByUuidUseCase } from '../../../application/use-cases/tool-types/get-tool-types-by-uuid.use-case';
import { GetToolTypesUseCase } from '../../../application/use-cases/tool-types/get-tool-types.use-case';
import { UpdateToolTypesUseCase } from '../../../application/use-cases/tool-types/update-tool-types.use-case';
import { CreateToolTypesDto } from '../../dtos/tool-types/create-tool-types.dto';

@Controller('tool-types')
export class ToolTypesController {
	constructor(
		private readonly createToolTypesUseCase: CreateToolTypesUseCase,
		private readonly getToolTypesUseCase: GetToolTypesUseCase,
		private readonly getToolTypesByUuidUseCase: GetToolTypesByUuidUseCase,
		private readonly updateToolTypesUseCase: UpdateToolTypesUseCase,
		private readonly deleteToolTypesUseCase: DeleteToolTypesUseCase,
	) {}

	@Post('create')
	async create(@Body(ValidationPipe) createToolTypesDto: CreateToolTypesDto) {
		const toolType = await this.createToolTypesUseCase.execute(
			createToolTypesDto.code,
			createToolTypesDto.name,
			createToolTypesDto.categoryId,
			createToolTypesDto.status ?? 'active',
			createToolTypesDto.image,
			createToolTypesDto.garageId,
		);
		return {
			success: true,
			message: 'Tipo de herramienta creado exitosamente',
			data: toolType,
		};
	}

	@Get('get-all')
	async findAll() {
		const result = await this.getToolTypesUseCase.executeGroupedByCategory();
		return {
			success: true,
			message: 'Tipos de herramienta agrupados por categoría obtenidos exitosamente',
			data: result,
		};
	}

	@Get('get-by-uuid/:uuid')
	async findOne(@Param('uuid') uuid: string) {
		const toolType = await this.getToolTypesByUuidUseCase.execute(uuid);
		return {
			success: true,
			message: 'Tipo de herramienta obtenido exitosamente',
			data: toolType,
		};
	}

	@Put('update-tool-types/:uuid')
	async update(
		@Param('uuid') uuid: string,
		@Body() updateToolTypesDto: CreateToolTypesDto,
	) {
		const toolType = await this.updateToolTypesUseCase.execute(uuid, updateToolTypesDto);
		return {
			success: true,
			message: 'Tipo de herramienta actualizado exitosamente',
			data: toolType,
		};
	}

	@Delete('delete-tool-types/:uuid')
	async delete(@Param('uuid') uuid: string) {
		const toolType = await this.deleteToolTypesUseCase.execute(uuid);
		return {
			success: true,
			message: 'Tipo de herramienta eliminado exitosamente',
			data: toolType,
		};
	}
}
