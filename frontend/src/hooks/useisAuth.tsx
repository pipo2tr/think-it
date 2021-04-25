import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useIsAuth = () => {
	const { data, loading } = useMeQuery();
	const router = useRouter();
	useEffect(() => {
		console.log(router);

		if (!loading && !data?.me) {
			router.query
				? router.replace("/login?next=" + router.asPath)
				: router.replace("/login?next=" + router.pathname);
		}
	}, [loading, data, router]);
};
