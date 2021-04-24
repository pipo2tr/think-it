import {
	Entity,
	BaseEntity,
	ManyToOne,
	PrimaryColumn,
	Column,
	PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class PostComment extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	text: string;

	@Field()
	@PrimaryColumn()
	userId: number;

	@Field()
	@ManyToOne(() => User, (user) => user.comments)
	user: User;

	@Field()
	@PrimaryColumn()
	postId: number;

	@ManyToOne(() => Post, (post) => post.comments, {
		onDelete: "CASCADE",
	})
    post: Post;
    
    @Field(() => Date)
	@CreateDateColumn()
	createdAt: string;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: string;
}
