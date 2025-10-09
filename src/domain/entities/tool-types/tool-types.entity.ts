export class ToolTypes {
	constructor(
		public readonly uuid: string,
		public readonly code: string,
		public readonly name: string,
		public readonly categoryId: number,
		public readonly status: string,
		public readonly image: string | null,
		public readonly garageId: number | null,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
	) {}
}
