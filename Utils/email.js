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

const signInEmail = async (email , name) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: '🎉 Welcome to Bounce - Registration Successful!',
    text: `Hi ${name},

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

const ResetPasswordEmail = async (email , name) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'Password Reset',
    text: `Hi ${name},

You recently requested to reset your password for your Bounce account.

To reset your password, please click the link below:

${process.env.RESET_PASSWORD_LINK}

If you didn’t request a password reset, please ignore this email.

Thanks,
The Bounce Team`
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

const sendResetCodeEmail = async (email , name , code ) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'Password Reset',
    text: `Hi ${name},

You recently requested to reset your password for your Bounce account.

To reset your password, please enter the verification code provided below:

${code}

If you didn’t request a password reset, please ignore this email.

Thanks,
The Bounce Team`
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

const sendResetPasswordEmail = async (email , name) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'Your Password Has Been Reset – Bounce',
    text: `Hi ${name},

We wanted to let you know that your password for your Bounce account was successfully reset.

If you made this change, no further action is needed.

If you did not reset your password, please contact our support team immediately.

Thanks,  
The Bounce Team`
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

const deleteAccountEmail = async (email , name) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: 'Your Account Has Been Deleted',
    text: `Hi ${name},

We regret to inform you that your Bounce account has been deleted.

If you made this change, no further action is needed.

If you did not delete your account, please contact our support team immediately.

Thanks,  
The Bounce Team`
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

export  { signInEmail , ResetPasswordEmail , sendResetCodeEmail , sendResetPasswordEmail , deleteAccountEmail};