import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api

export async function POST(request) {
  //   const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
  //   const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
  //   const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  const { name, email, message } = await request.json();
  console.log(process.env.EMAIL_HOST);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  try {
    const mail = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: "punia0481@gmail.com",
      replyTo: email,
      subject: `A Full Stack Dev Activity`,
      html: `
            <p>Message from afullstack contact form:</p>
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" });
  }
}
