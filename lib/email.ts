// // utils/email.ts
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_SERVER_USER,
//     pass: process.env.EMAIL_SERVER_PASSWORD,
//   },
// });

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const url = "api.zeptomail.com/";
const token = "Zoho-enczapikey wSsVR60j/hH3C/grnzP/de8/kF8ADgn0QE563VKm7XKtGaqXosdolEycBlD0H/FJQmJoRjVHorwszBkF1jQHj45+zVoAACiF9mqRe1U4J3x17qnvhDzPV2RZkReJLo4Bzw1rnWdiF8Ak+g==";

let client = new SendMailClient({ url, token });
export async function sendEmail({ to, subject, text, html }: EmailOptions) {

  try {

    const info = client.sendMail({
      "from":
      {
        "address": "noreply@mide.codes",
        "name": "noreply"
      },
      "to":
        [
          {
            "email_address":
            {
              "address": to,
              "name": "Sunday"
            }
          }
        ],
      "subject": subject,
      "htmlbody": html,
    });
    console.log('Email sent: ', info);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}


// https://www.npmjs.com/package/zeptomail

// For ES6
import { SendMailClient } from "zeptomail";

// For CommonJS
// var { SendMailClient } = require("zeptomail");




