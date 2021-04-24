import DataLoader from "dataloader";
import { Vote } from "../entities/Vote";


export const VoteLoader = new DataLoader<{ postId: number; userId: number },Vote, null>(async (voteKeys) => {
	const votes = await Vote.findByIds(voteKeys as any);
	const voteMap: Record<string, Vote> = {};
	votes.forEach((vote) => {
		voteMap[`${vote.userId}|${vote.postId}`] = vote;
	});

	return voteKeys.map((voteKey) => voteMap[`${voteKey.userId}|${voteKey.postId}`]);
});
