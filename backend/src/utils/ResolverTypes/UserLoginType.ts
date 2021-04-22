import { InputType, Field } from "type-graphql";
@InputType()
export class UserLoginType {
	@Field()
	usernameOremail: string;
	@Field()
	password: string;
}
