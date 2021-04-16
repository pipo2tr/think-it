import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	text!: string;

	@Field()
	@Column({ type: "int", default: 0 })
	points: number;

	@Field()
	@Column()
	creatorId!: number;

	@Field()
	@ManyToOne(() => User, (user) => user.posts)
	creator: User;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: string;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: string;

}
