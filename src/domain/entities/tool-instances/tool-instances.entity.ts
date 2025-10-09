export class ToolInstances {
	constructor(
		public readonly uuid: string,
		public readonly toolTypeId: string,
		public readonly serialCode: string,
		public readonly garageId: number,
		public readonly conditionId: number,
		public readonly status: string,
		public readonly lastAssignedUser: string | null,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
	) {}
}
