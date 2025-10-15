import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { GarageEntity } from './garage.entity';

@Entity('tool_types')
export class ToolTypesEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', length: 100, unique: true })
	code: string;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'uuid', name: 'category_id' })
	categoryId: string;

	@ManyToOne(() => CategoryEntity)
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;

	@Column({
		type: 'enum',
		enum: ['active', 'inactive'],
		default: 'active',
	})
	status: string;

	@Column({ type: 'varchar', length: 500, nullable: true })
	image: string;

	@Column({ type: 'uuid', name: 'garage_id', nullable: true })
	garageId: string;

	@ManyToOne(() => GarageEntity)
	@JoinColumn({ name: 'garage_id' })
	garage: GarageEntity;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
