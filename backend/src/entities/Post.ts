import { Field, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { PostComment } from "./PostComment";
import { User } from "./User";
import { Vote } from "./Vote";

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
	@Column({ type: "int", default: 0, nullable: true })
	numComments: number;

	@Field()
	@Column()
	creatorId!: number;

	@Field()
	@ManyToOne(() => User, (user) => user.posts)
	creator: User;

	@OneToMany(() => Vote, (vote) => vote.post)
	votes: Vote[];

	@Field(() => Boolean, { nullable: true })
	voteStatus: boolean | null;

	@OneToMany(()=> PostComment, (comment) => comment.post, {nullable: true})
	comments: PostComment[] | null

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: string;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: string;
}
