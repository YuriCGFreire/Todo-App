import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDTO{

    @ApiProperty({
        description: 'Description é o nome da task',
        example: 'Dockerizar o projeto'
    })
    description: string;

    @ApiProperty({
        description: 'Indica se a task foi feita ou não',
        default: false
    })
    done: Boolean;
}