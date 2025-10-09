import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('tool_types')
export class ToolTypesEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', length: 100, unique: true })
	code: string;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'int', name: 'category_id' })
	categoryId: number;

	@Column({
		type: 'enum',
		enum: ['active', 'inactive'],
		default: 'active',
	})
	status: string;

	@Column({ type: 'varchar', length: 500, nullable: true })
	image: string;

	@Column({ type: 'int', name: 'garage_id', nullable: true })
	garageId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
