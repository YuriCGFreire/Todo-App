import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskSwagger } from './swagger/create-task.swagger';
import { IndexTaskSwagger } from './swagger/index-task.swagger';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({summary: 'Criar uma task, campo "done" false como padrão'})
  @ApiResponse({
    status: 201, 
    description: "Nova task criada com sucesso",
    type: CreateTaskSwagger
  })
  createTask(@Body() data: CreateTaskDTO){
    return this.tasksService.createTask(data)
  }

  @Patch('/:id')
  @ApiOperation({summary: 'Atualizar o campo da task'})
  @ApiResponse({
    status: 200, 
    description: "Task atualizada com sucesso",
    type: CreateTaskSwagger
  })
  updateTask(@Body() updateTaskDTO:UpdateTaskDTO, @Param('id') id: string){
    return this.tasksService.updateTask(updateTaskDTO, id)
  }

  @Delete('/:id')
  @ApiOperation({summary: 'Deletar task do banco de dados'})
  @ApiResponse({
    status: 200, 
    description: "Task deletada com sucesso"
  })
  deleteTask(@Param('id') id:string){
    return this.tasksService.deleteTask(id)
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso',
    type: IndexTaskSwagger,
    isArray: true,
  })
  findAllTasks(){
    return this.tasksService.findAllTasks()
  }
}
