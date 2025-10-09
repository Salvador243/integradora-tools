import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tool_history')
export class ToolHistoryEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', name: 'tool_instance_id' })
	toolInstanceId: string;

	@Column({ type: 'int', name: 'garage_id' })
	garageId: number;

	@Column({ type: 'varchar', length: 255, name: 'user_assigned' })
	userAssigned: string;

	@Column({ type: 'int', name: 'condition_id' })
	conditionId: number;

	@Column({ type: 'datetime', name: 'fecha_evento' })
	fechaEvento: Date;

	@Column({
		type: 'enum',
		enum: ['assigned', 'returned', 'maintenance', 'transferred'],
		name: 'tipo_evento',
	})
	tipoEvento: string;
}
