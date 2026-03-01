const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendOTPEmail(to, otp) {
    const mailOptions = {
        from: `"Alumni Sphere" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Verify Your Email - Alumni Sphere",
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #4338ca; text-align: center;">Alumni Sphere</h2>
        <p style="color: #334155; font-size: 15px;">Hello,</p>
        <p style="color: #334155; font-size: 15px;">Use the code below to verify your email address:</p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4338ca; background: #eef2ff; padding: 12px 24px; border-radius: 8px;">
            ${otp}
          </span>
        </div>
        <p style="color: #64748b; font-size: 13px; text-align: center;">This code expires in <strong>5 minutes</strong>.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}

async function sendPasswordResetOTPEmail(to, otp) {
    const mailOptions = {
        from: `"Alumni Sphere" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Reset Your Password - Alumni Sphere",
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #4338ca; text-align: center;">Alumni Sphere</h2>
        <p style="color: #334155; font-size: 15px;">Hello,</p>
        <p style="color: #334155; font-size: 15px;">Use the code below to reset your password:</p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4338ca; background: #eef2ff; padding: 12px 24px; border-radius: 8px;">
            ${otp}
          </span>
        </div>
        <p style="color: #64748b; font-size: 13px; text-align: center;">This code expires in <strong>5 minutes</strong>.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendOTPEmail, sendPasswordResetOTPEmail };
