export class ToolHistory {
	constructor(
		public readonly uuid: string,
		public readonly toolInstanceId: string,
		public readonly garageId: string,
		public readonly userAssigned: string,
		public readonly conditionId: string,
		public readonly fechaEvento: Date,
		public readonly tipoEvento: string,
		// Campos relacionados opcionales
		public readonly garageCode?: string,
		public readonly garageName?: string,
		public readonly conditionCode?: string,
		public readonly conditionDescription?: string,
	) {}
}
