import {
	IsIn,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	MaxLength,
} from 'class-validator';

export class CreateToolInstancesDto {
	@IsUUID()
	@IsNotEmpty()
	toolTypeId: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	serialCode: string;

	@IsUUID()
	@IsNotEmpty()
	garageId: string;

	@IsUUID()
	@IsNotEmpty()
	conditionId: string;

	@IsString()
	@IsOptional()
	@IsIn(['available', 'assigned', 'maintenance', 'lost'])
	status?: string;

	@IsString()
	@IsOptional()
	@MaxLength(255)
	lastAssignedUser?: string;
}
