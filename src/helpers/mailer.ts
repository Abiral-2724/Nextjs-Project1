import User from '@/models/userModel';
import nodemailer from 'nodemailer';  // Remove the SentMessageInfo import if you want to fallback to `any`
import bcryptjs from 'bcryptjs';

// Define the argument types
interface SendEmailParams {
  email: string;
  emailType: 'VERIFY' | 'RESET'; // You can use a union type for the emailType
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    }

    // Create the nodemailer transport
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'fc2709f935b5a2',
        pass: '77d4d7bf674816',
      },
    });

    // Define the email options
    const mailOption = {
      from: '"Abiral Jain 👻" <abiral2724@gmail.com>',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email ✔' : 'Reset your password ✔',
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      } or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    // Send the email and return the response
    const mailResponse = await transport.sendMail(mailOption);

    return mailResponse;

  } catch (error: unknown) {
    throw new Error((error as Error)?.message);
  }
};
