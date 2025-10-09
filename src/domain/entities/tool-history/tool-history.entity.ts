export class ToolHistory {
	constructor(
		public readonly uuid: string,
		public readonly toolInstanceId: string,
		public readonly garageId: number,
		public readonly userAssigned: string,
		public readonly conditionId: number,
		public readonly fechaEvento: Date,
		public readonly tipoEvento: string,
	) {}
}
