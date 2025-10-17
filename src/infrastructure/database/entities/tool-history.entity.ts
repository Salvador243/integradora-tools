import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { GarageEntity } from './garage.entity';
import { ConditionEntity } from './condition.entity';

@Entity('tool_history')
export class ToolHistoryEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column({ type: 'varchar', name: 'tool_instance_id' })
	toolInstanceId: string;

	@Column({ type: 'uuid', name: 'garage_id' })
	garageId: string;

	@ManyToOne(() => GarageEntity)
	@JoinColumn({ name: 'garage_id' })
	garage: GarageEntity;

	@Column({ type: 'varchar', length: 255, name: 'user_assigned' })
	userAssigned: string;

	@Column({ type: 'uuid', name: 'condition_id' })
	conditionId: string;

	@ManyToOne(() => ConditionEntity)
	@JoinColumn({ name: 'condition_id' })
	condition: ConditionEntity;

	@Column({ type: 'datetime', name: 'fecha_evento' })
	fechaEvento: Date;

	@Column({
		type: 'enum',
		enum: ['assigned', 'returned', 'maintenance', 'transferred'],
		name: 'tipo_evento',
	})
	tipoEvento: string;
}
