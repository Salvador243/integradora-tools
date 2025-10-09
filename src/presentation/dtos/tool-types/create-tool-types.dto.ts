import {
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateToolTypesDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	code: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	name: string;

	@IsNumber()
	@IsNotEmpty()
	categoryId: number;

	@IsString()
	@IsOptional()
	@IsIn(['active', 'inactive'])
	status?: string;

	@IsString()
	@IsOptional()
	@MaxLength(500)
	image?: string;

	@IsNumber()
	@IsOptional()
	garageId?: number;
}
