import { UserRegisterType } from "./UserRegisterType";

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
export const registerValidator = (input: UserRegisterType) => {
	if (input.username.length < 3 || input.username.includes("@")) {
		return [
			{
				field: "username",
				message: "Username must be atleast 3 character long and shouldn't have an @ character",
			},
		];
    }
    else if (!emailRegex.test(input.email)) {
        return [
			{
				field: "email",
				message: "Invalid email",
			},
		];
    }
    else if (!pwdRegex.test(input.password)) {
        return [
			{
				field: "password",
				message: "Password must contain atleast one number and should be atleast 8 characters long.",
			},
		];
    }

    return null
};
