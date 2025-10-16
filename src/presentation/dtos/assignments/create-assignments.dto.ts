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

	@IsString()
	@IsNotEmpty()
	conditionIdSalida: string;

	@IsString()
	@IsOptional()
	conditionIdRegreso?: string;

	@IsString()
	@IsOptional()
	@IsIn(['open', 'closed'])
	status?: string;
}
