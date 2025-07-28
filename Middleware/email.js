import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'princeben9312@gmail.com',
    pass: String(process.env.PASS)
  }
});

const now = new Date();

const signInEmail = async (email) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: '🎉 Welcome to Bounce - Registration Successful!',
    text: `Hi ${email},

Thanks for signing up! Your account has been successfully created and you're all set to start using Bounce.

Here are your registration details:

  Email: ${email}

  Registration Date: ${now.toDateString()} at ${now.toTimeString()}

If you didn’t sign up for this account, please contact us immediately at ${process.env.SUPPORT_EMAIL}.

Welcome aboard!

   – The Bounce Team`
  };

  try {
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
    return;
  } catch (error) {
    console.log(error);
    return "Email not sent";
  }
}

export  { signInEmail };