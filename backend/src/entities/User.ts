import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	username!: string;

	@Column()
	password!: string;

	@Field()
	@Column()
	email!: string	
		
	@Field(() => Date)
	@CreateDateColumn()
	createdAt: string;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: boolean;
}
