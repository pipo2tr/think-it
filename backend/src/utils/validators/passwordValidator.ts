import { pwdRegex } from "./regex";
export const passwordValidator = (password: string) => {
    if (!pwdRegex.test(password)) {
        return [
			{
				field: "password",
				message: "Password must contain atleast one number and should be atleast 8 characters long.",
			},
		];
    }
    return null
}