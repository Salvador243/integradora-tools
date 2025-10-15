import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { ToolTypesEntity } from './tool-types.entity';
import { GarageEntity } from './garage.entity';
import { ConditionEntity } from './condition.entity';

@Entity('tool_instances')
export class ToolInstancesEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'uuid', name: 'tool_type_id' })
	toolTypeId: string;

	@ManyToOne(() => ToolTypesEntity)
	@JoinColumn({ name: 'tool_type_id' })
	toolType: ToolTypesEntity;

	@Column({ type: 'varchar', length: 100, unique: true, name: 'serial_code' })
	serialCode: string;

	@Column({ type: 'uuid', name: 'garage_id' })
	garageId: string;

	@ManyToOne(() => GarageEntity)
	@JoinColumn({ name: 'garage_id' })
	garage: GarageEntity;

	@Column({ type: 'uuid', name: 'condition_id' })
	conditionId: string;

	@ManyToOne(() => ConditionEntity)
	@JoinColumn({ name: 'condition_id' })
	condition: ConditionEntity;

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
