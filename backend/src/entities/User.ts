import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Column()
	password!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@OneToMany(() => Post, (post) => post.creator)
	posts: Post[];

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: string;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: boolean;
}
