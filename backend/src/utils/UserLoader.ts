import DataLoader from "dataloader";
import { User } from "../entities/User";


export const UserLoader = new DataLoader<number, User>(async (userIds) => {
	const user = await User.findByIds(userIds as number[]);
	const userMap: Record<number, User> = {};
	user.forEach((u) => {
		userMap[u.id] = u;
	});

	return userIds.map((userId) => userMap[userId]);
});
