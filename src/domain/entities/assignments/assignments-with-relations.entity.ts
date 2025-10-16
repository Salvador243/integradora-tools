export class Condition {
	constructor(
		public readonly uuid: string,
		public readonly code: string,
		public readonly description: string,
		public readonly status: boolean,
	) {}
}

export class ToolType {
	constructor(
		public readonly uuid: string,
		public readonly code: string,
		public readonly name: string,
		public readonly status: string,
		public readonly image?: string,
	) {}
}

export class ToolInstance {
	constructor(
		public readonly uuid: string,
		public readonly serialCode: string,
		public readonly status: string,
		public readonly toolType: ToolType,
	) {}
}

export class AssignmentsWithRelations {
	constructor(
		public readonly uuid: string,
		public readonly toolInstance: ToolInstance,
		public readonly userAssigned: string,
		public readonly fechaSalida: Date,
		public readonly fechaRegreso: Date | null,
		public readonly conditionSalida: Condition,
		public readonly conditionRegreso: Condition | null,
		public readonly status: string,
		public readonly createdAt: Date,
	) {}
}
