import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { ToolInstancesEntity } from './tool-instances.entity';
import { ConditionEntity } from './condition.entity';

@Entity('assignments')
export class AssignmentsEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', name: 'tool_instance_id' })
	toolInstanceId: string;

	@ManyToOne(() => ToolInstancesEntity)
	@JoinColumn({ name: 'tool_instance_id' })
	toolInstance: ToolInstancesEntity;

	@Column({ type: 'varchar', length: 255, name: 'user_assigned' })
	userAssigned: string;

	@Column({ type: 'datetime', name: 'fecha_salida' })
	fechaSalida: Date;

	@Column({ type: 'datetime', nullable: true, name: 'fecha_regreso' })
	fechaRegreso: Date;

	@Column({ type: 'varchar', length: 255, name: 'condition_id_salida' })
	conditionIdSalida: string;

	@ManyToOne(() => ConditionEntity)
	@JoinColumn({ name: 'condition_id_salida' })
	conditionSalida: ConditionEntity;

	@Column({ type: 'varchar', length: 255, nullable: true, name: 'condition_id_regreso' })
	conditionIdRegreso: string;

	@ManyToOne(() => ConditionEntity)
	@JoinColumn({ name: 'condition_id_regreso' })
	conditionRegreso: ConditionEntity;

	@Column({
		type: 'enum',
		enum: ['open', 'closed'],
		default: 'open',
	})
	status: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
}
