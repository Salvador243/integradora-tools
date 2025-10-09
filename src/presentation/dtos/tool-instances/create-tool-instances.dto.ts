import {
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateToolInstancesDto {
	@IsString()
	@IsNotEmpty()
	toolTypeId: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	serialCode: string;

	@IsNumber()
	@IsNotEmpty()
	garageId: number;

	@IsNumber()
	@IsNotEmpty()
	conditionId: number;

	@IsString()
	@IsOptional()
	@IsIn(['available', 'assigned', 'maintenance', 'lost'])
	status?: string;

	@IsString()
	@IsOptional()
	@MaxLength(255)
	lastAssignedUser?: string;
}
