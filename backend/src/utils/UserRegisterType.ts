import { InputType, Field } from "type-graphql";
@InputType()
export class UserRegisterType {
	@Field()
	username: string;
	@Field()
	password: string;
	@Field()
	email: string;
}
