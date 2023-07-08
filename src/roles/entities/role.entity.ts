import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @ManyToMany(() => User, user => user.roles)
    // users: User[]    
}
