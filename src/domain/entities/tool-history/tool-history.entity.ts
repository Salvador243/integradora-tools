export class ToolHistory {
	constructor(
		public readonly uuid: string,
		public readonly toolInstanceId: string,
		public readonly garageId: string,
		public readonly userAssigned: string,
		public readonly conditionId: string,
		public readonly fechaEvento: Date,
		public readonly tipoEvento: string,
		// Campos relacionados opcionales para ToolInstance
		public readonly toolInstanceUuid?: string,
		public readonly toolInstanceSerialCode?: string,
		public readonly toolInstanceStatus?: string,
		public readonly toolTypeCode?: string,
		public readonly toolTypeName?: string,
		// Campos relacionados opcionales para Garage
		public readonly garageUuid?: string,
		public readonly garageCode?: string,
		public readonly garageName?: string,
		// Campos relacionados opcionales para Condition
		public readonly conditionUuid?: string,
		public readonly conditionCode?: string,
		public readonly conditionDescription?: string,
	) {}
}
