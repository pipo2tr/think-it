import { Query, Resolver } from "type-graphql";

@Resolver()
export class TestResolver {
	@Query(()=> String)
	async hello() {
		return "hello";
	}
}
