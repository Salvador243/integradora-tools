import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ToolTypesModule } from './presentation/modules/tool-types.module';
import { ToolInstancesModule } from './presentation/modules/tool-instances.module';
import { AssignmentsModule } from './presentation/modules/assignments.module';
import { ToolHistoryModule } from './presentation/modules/tool-history.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		DatabaseModule,
		ToolTypesModule,
		ToolInstancesModule,
		AssignmentsModule,
		ToolHistoryModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
