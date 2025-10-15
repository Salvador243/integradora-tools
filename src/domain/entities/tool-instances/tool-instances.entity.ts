export class ToolInstances {
	constructor(
		public readonly uuid: string,
		public readonly toolTypeId: string,
		public readonly serialCode: string,
		public readonly garageId: string,
		public readonly conditionId: string,
		public readonly status: string,
		public readonly lastAssignedUser: string | null,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
		public readonly toolTypeCode?: string,
		public readonly toolTypeName?: string,
		public readonly garageCode?: string,
		public readonly garageName?: string,
		public readonly conditionCode?: string,
		public readonly conditionDescription?: string,
	) {}
}
