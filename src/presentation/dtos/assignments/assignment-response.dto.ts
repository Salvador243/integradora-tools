export class ConditionResponseDto {
	uuid: string;
	code: string;
	description: string;
	status: boolean;
}

export class ToolTypeResponseDto {
	uuid: string;
	code: string;
	name: string;
	status: string;
	image?: string;
}

export class ToolInstanceResponseDto {
	uuid: string;
	serialCode: string;
	status: string;
	toolType: ToolTypeResponseDto;
}

export class AssignmentResponseDto {
	uuid: string;
	toolInstance: ToolInstanceResponseDto;
	userAssigned: string;
	fechaSalida: Date;
	fechaRegreso: Date | null;
	conditionSalida: ConditionResponseDto;
	conditionRegreso: ConditionResponseDto | null;
	status: string;
	createdAt: Date;
}
