import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from 'typeorm';

@Entity('assignments')
export class AssignmentsEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', name: 'tool_instance_id' })
	toolInstanceId: string;

	@Column({ type: 'varchar', length: 255, name: 'user_assigned' })
	userAssigned: string;

	@Column({ type: 'datetime', name: 'fecha_salida' })
	fechaSalida: Date;

	@Column({ type: 'datetime', nullable: true, name: 'fecha_regreso' })
	fechaRegreso: Date;

	@Column({ type: 'int', name: 'condition_id_salida' })
	conditionIdSalida: number;

	@Column({ type: 'int', nullable: true, name: 'condition_id_regreso' })
	conditionIdRegreso: number;

	@Column({
		type: 'enum',
		enum: ['open', 'closed'],
		default: 'open',
	})
	status: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
}
