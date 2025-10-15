export class ToolTypes {
	constructor(
		public readonly uuid: string,
		public readonly code: string,
		public readonly name: string,
		public readonly categoryId: string,
		public readonly status: string,
		public readonly image: string | null,
		public readonly garageId: string | null,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
		public readonly categoryCode?: string,
		public readonly categoryName?: string,
		public readonly garageCode?: string | null,
		public readonly garageName?: string | null,
	) {}
}
