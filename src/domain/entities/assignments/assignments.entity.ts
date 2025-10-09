export class Assignments {
	constructor(
		public readonly uuid: string,
		public readonly toolInstanceId: string,
		public readonly userAssigned: string,
		public readonly fechaSalida: Date,
		public readonly fechaRegreso: Date | null,
		public readonly conditionIdSalida: number,
		public readonly conditionIdRegreso: number | null,
		public readonly status: string,
		public readonly createdAt: Date,
	) {}
}
