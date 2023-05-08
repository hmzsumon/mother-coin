const nodeMailer = require('nodemailer');
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

// send email
const sendEmail = async (option) => {
	try {
		const apiInstance = new Sib.TransactionalEmailsApi();
		const sendSmtpEmail = new Sib.SendSmtpEmail();
		sendSmtpEmail.subject = option.subject;
		sendSmtpEmail.htmlContent = option.message;
		sendSmtpEmail.sender = {
			name: 'Mother Coin',
			email: 'motherwallet9@gmail.com',
		};
		sendSmtpEmail.to = [{ email: option.email }];
		await apiInstance.sendTransacEmail(sendSmtpEmail);
	} catch (err) {
		console.log(err);
	}
};

// send me email
const sendMe = async (options) => {
	const transporter = nodeMailer.createTransport({
		host: process.env.SMPT_HOST,
		port: process.env.SMPT_PORT,
		service: process.env.SMPT_SERVICE,
		auth: {
			user: 'zakariasumon555@gmail.com',
			pass: 'rsutgdolqsktwqdy',
		},
	});

	await transporter.sendMail({
		from: '"Zakarias sumon" <zakariasumon555@gmail.com>',
		to: 'zakariadev01@gmail.com',
		subject: options.subject,
		text: options.message,
	});
	// console.log(options.message);
};

// send verification email
const sendVerificationEmail = async (email, subject, text) => {
	try {
		const transporter = nodeMailer.createTransport({
			host: process.env.SMPT_HOST,
			service: process.env.SMPT_SERVICE,
			port: process.env.SMPT_PORT,
			auth: {
				user: process.env.SMPT_MAIL,
				pass: process.env.SMPT_PASSWORD,
			},
		});
		await transporter.sendMail(
			{
				from: process.env.SMPT_MAIL,
				to: email,
				subject: subject,
				text: text,
			},
			(err, info) => {
				if (err) {
					console.log(err);
				} else {
					console.log(info);
				}
			}
		);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { sendEmail, sendMe, sendVerificationEmail };
