import {
	IsDateString,
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateToolHistoryDto {
	@IsString()
	@IsNotEmpty()
	toolInstanceId: string;

	@IsNumber()
	@IsNotEmpty()
	garageId: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	userAssigned: string;

	@IsNumber()
	@IsNotEmpty()
	conditionId: number;

	@IsDateString()
	@IsNotEmpty()
	fechaEvento: Date;

	@IsString()
	@IsNotEmpty()
	@IsIn(['assigned', 'returned', 'maintenance', 'transferred'])
	tipoEvento: string;
}
