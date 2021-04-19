import nodemailer from "nodemailer";
/**
 * sends an email
 * @param {string} to - email of the reciever
 * @param {string} html - markup you want to send to the user
 */
export async function sendEmail(to: string, html: string) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "a71fdbfcaad3e3",
			pass: "040f211fab46b4",
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"zoie 👻" <zoie.sanford35@ethereal.email>', // sender address
		to, // list of receivers
		subject: "Request for change password", // plain text body
		html, // html body
	});

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", "https://mailtrap.io/inboxes");
}

// main().catch(console.error);
