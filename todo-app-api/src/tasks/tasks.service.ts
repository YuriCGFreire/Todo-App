import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Tasks } from './entities/tasks.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>
    ) { }

    async createTask(createTaskDTO: CreateTaskDTO) {

        const task = await this.tasksRepository.findOne({
            where: { description: createTaskDTO.description }
        })

        if (task) {
            throw new HttpException(
                "Task already exists!",
                HttpStatus.BAD_REQUEST
            )
        }

        try {
            const task = await this.tasksRepository.create(createTaskDTO)
            return this.tasksRepository.save(task)
        } catch (err) {
            throw new HttpException(
                err.message,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async deleteTask(id: string) {

        try {
            return this.tasksRepository.createQueryBuilder()
                .delete()
                .from(Tasks)
                .where({ id: id })
                .execute()
        } catch (err) {
            throw new HttpException(
                err.message,
                HttpStatus.BAD_REQUEST
            )
        }

    }

    async findAllTasks() {

        try {
            return this.tasksRepository.find({
                select: ['id', 'description', 'done', 'created_at', 'updated_at']
            })
        } catch (err) {
            throw new HttpException(
                err.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async updateTask(updateTask: UpdateTaskDTO, id: string) {
        try {
            return this.tasksRepository.createQueryBuilder()
                .update(Tasks)
                .set({
                    description: updateTask.description,
                    done: updateTask.done
                })
                .where({ id: id })
                .execute()
        } catch (err) {
            throw new HttpException(
                err.message,
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
