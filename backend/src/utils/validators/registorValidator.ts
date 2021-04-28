import { UserRegisterType } from "../ResolverTypes/UserRegisterType";
import { pwdRegex, emailRegex, usernameRegex } from "./regex";

export const registerValidator = (input: UserRegisterType) => {
	if (!usernameRegex.test(input.username)) {
		return [
			{
				field: "username",
				message:
					"Username must be between 3 and 16 characters long and shouldn't have any special characters",
			},
		];
	} else if (!emailRegex.test(input.email)) {
		return [
			{
				field: "email",
				message: "Invalid email",
			},
		];
	} else if (!pwdRegex.test(input.password)) {
		return [
			{
				field: "password",
				message:
					"Password must contain atleast one number and should be atleast 8 characters long.",
			},
		];
	}

	return null;
};
