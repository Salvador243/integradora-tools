import {
	IsDateString,
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateAssignmentsDto {
	@IsString()
	@IsNotEmpty()
	toolInstanceId: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	userAssigned: string;

	@IsDateString()
	@IsNotEmpty()
	fechaSalida: Date;

	@IsDateString()
	@IsOptional()
	fechaRegreso?: Date;

	@IsNumber()
	@IsNotEmpty()
	conditionIdSalida: number;

	@IsNumber()
	@IsOptional()
	conditionIdRegreso?: number;

	@IsString()
	@IsOptional()
	@IsIn(['open', 'closed'])
	status?: string;
}
