import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Tasks {

    @PrimaryColumn()
    id: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false, default: false})
    done: Boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}