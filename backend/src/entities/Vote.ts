import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Vote extends BaseEntity {
	@Column({ type: "boolean", nullable: true })
	isVoted: boolean;

	@PrimaryColumn()
	userId: number;

	@ManyToOne(() => User, (user) => user.votes)
	user: User;

	@PrimaryColumn()
	postId: number;

	@ManyToOne(() => Post, (post) => post.votes, {
		onDelete: "CASCADE",
	})
	post: Post;
}
