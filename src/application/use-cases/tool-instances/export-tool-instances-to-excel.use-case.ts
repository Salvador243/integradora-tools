import { Inject, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import type { ToolInstancesRepository } from '../../../domain/repositories/tool-instances.repository';

@Injectable()
export class ExportToolInstancesToExcelUseCase {
	constructor(
		@Inject('ToolInstancesRepository')
		private readonly toolInstancesRepository: ToolInstancesRepository,
	) {}

	async execute(): Promise<Buffer> {
		// Obtener todas las instancias de herramientas
		const { toolInstances } = await this.toolInstancesRepository.findAll(1, 999999);

		// Crear un nuevo libro de Excel
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Herramientas');

		// Definir las columnas
		worksheet.columns = [
			{ header: 'Código Serial', key: 'serialCode', width: 20 },
			{ header: 'Tipo de Herramienta (Código)', key: 'toolTypeCode', width: 25 },
			{ header: 'Tipo de Herramienta (Nombre)', key: 'toolTypeName', width: 30 },
			{ header: 'Garage (Código)', key: 'garageCode', width: 20 },
			{ header: 'Garage (Nombre)', key: 'garageName', width: 25 },
			{ header: 'Condición (Código)', key: 'conditionCode', width: 20 },
			{ header: 'Condición (Descripción)', key: 'conditionDescription', width: 30 },
			{ header: 'Estado', key: 'status', width: 15 },
			{ header: 'Último Usuario Asignado', key: 'lastAssignedUser', width: 30 },
			{ header: 'Fecha de Creación', key: 'createdAt', width: 20 },
			{ header: 'Última Actualización', key: 'updatedAt', width: 20 },
		];

		// Estilizar el encabezado
		worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
		worksheet.getRow(1).fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF4472C4' },
		};
		worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

		// Agregar los datos
		toolInstances.forEach((instance) => {
			worksheet.addRow({
				serialCode: instance.serialCode,
				toolTypeCode: instance.toolTypeCode || 'N/A',
				toolTypeName: instance.toolTypeName || 'N/A',
				garageCode: instance.garageCode || 'N/A',
				garageName: instance.garageName || 'N/A',
				conditionCode: instance.conditionCode || 'N/A',
				conditionDescription: instance.conditionDescription || 'N/A',
				status: instance.status,
				lastAssignedUser: instance.lastAssignedUser || 'N/A',
				createdAt: instance.createdAt ? new Date(instance.createdAt).toLocaleString('es-MX') : 'N/A',
				updatedAt: instance.updatedAt ? new Date(instance.updatedAt).toLocaleString('es-MX') : 'N/A',
			});
		});

		// Aplicar bordes a todas las celdas con datos
		worksheet.eachRow((row, rowNumber) => {
			row.eachCell((cell) => {
				cell.border = {
					top: { style: 'thin' },
					left: { style: 'thin' },
					bottom: { style: 'thin' },
					right: { style: 'thin' },
				};
			});
		});

		// Generar el buffer del archivo Excel
		const buffer = await workbook.xlsx.writeBuffer();
		return Buffer.from(buffer);
	}
}
