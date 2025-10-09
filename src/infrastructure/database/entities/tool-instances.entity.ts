import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('tool_instances')
export class ToolInstancesEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', name: 'tool_type_id' })
	toolTypeId: string;

	@Column({ type: 'varchar', length: 100, unique: true, name: 'serial_code' })
	serialCode: string;

	@Column({ type: 'int', name: 'garage_id' })
	garageId: number;

	@Column({ type: 'int', name: 'condition_id' })
	conditionId: number;

	@Column({
		type: 'enum',
		enum: ['available', 'assigned', 'maintenance', 'lost'],
		default: 'available',
	})
	status: string;

	@Column({ type: 'varchar', length: 255, nullable: true, name: 'last_assigned_user' })
	lastAssignedUser: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
