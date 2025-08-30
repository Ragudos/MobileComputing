import { google } from "googleapis";
import nodemailer from "nodemailer";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_GMAIL_USER,
    GOOGLE_REFRESH_TOKEN,
    IS_DEVELOPMENT,
} from "./consts";

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export async function sendGoogleMessage(message: string, recipient: string) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: GOOGLE_GMAIL_USER,
                clientSecret: GOOGLE_CLIENT_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken.token || "",
            },
        });

        const mailOptions = {
            from: `Aaron Ragudos <${GOOGLE_GMAIL_USER}>`,
            to: recipient,
            subject: "Sigma University Email Verification",
            html: message,
        } as nodemailer.SendMailOptions;

        const info = await transport.sendMail(mailOptions);

        if (IS_DEVELOPMENT) {
            console.log("Email sent:", info);
        }
    } catch (err) {
        throw new Error("Failed to send email");
    }
}
