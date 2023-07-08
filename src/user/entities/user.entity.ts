import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Logs } from 'src/logs/entities/log.entity';
import { Roles } from 'src/roles/entities/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;

    @Column() 
    password: string;

    // @OneToMany(() => Logs, (logs) => logs.user)
    // logs: Logs[];

    // @ManyToMany(() => Roles, (role) => role.users)
    // @JoinTable({ name: "users_roles" })
    // roles: Roles[]
}
