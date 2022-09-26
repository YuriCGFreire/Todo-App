import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'todo-app',
      entities: [
        join(__dirname, '**', '*.entity.{ts,js}')
      ],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
