import {
	IsIn,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
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

	@IsUUID()
	@IsNotEmpty()
	categoryId: string;

	@IsString()
	@IsOptional()
	@IsIn(['active', 'inactive'])
	status?: string;

	@IsString()
	@IsOptional()
	@MaxLength(500)
	image?: string;

	@IsUUID()
	@IsOptional()
	garageId?: string;
}
