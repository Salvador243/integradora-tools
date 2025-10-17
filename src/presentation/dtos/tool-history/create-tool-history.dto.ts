import {
	IsDateString,
	IsIn,
	IsNotEmpty,
	IsString,
	IsUUID,
	MaxLength,
} from 'class-validator';

export class CreateToolHistoryDto {
	@IsString()
	@IsNotEmpty()
	toolInstanceId: string;

	@IsUUID()
	@IsNotEmpty()
	garageId: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	userAssigned: string;

	@IsUUID()
	@IsNotEmpty()
	conditionId: string;

	@IsDateString()
	@IsNotEmpty()
	fechaEvento: Date;

	@IsString()
	@IsNotEmpty()
	@IsIn(['assigned', 'returned', 'maintenance', 'transferred'])
	tipoEvento: string;
}
