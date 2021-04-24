import { Role } from "../enums/Role";
import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { PostComment } from "./PostComment";

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

	@Field()
	@Column({ type: "enum", default: Role.USER, enum:Role })
	role!: Role;

	@OneToMany(()=> Vote, (vote) => vote.user)
	votes: Vote[]

	@OneToMany(()=> PostComment, (comment) => comment.user)
	comments: PostComment[]
	
	@Field(() => Date)
	@CreateDateColumn()
	createdAt: string;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: string;
}
