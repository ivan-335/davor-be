import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } from '../config/mail';

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

export async function sendVerificationEmail(to: string, token: string) {
    const url = `http://localhost:4000/api/auth/verify/${token}`;
    await transporter.sendMail({
        from: `"Chat App" <${EMAIL_USER}>`,
        to,
        subject: 'Verify your email',
        html: `<p>Please verify your email by clicking <a href="${url}">here</a>.</p>`,
    });
}
