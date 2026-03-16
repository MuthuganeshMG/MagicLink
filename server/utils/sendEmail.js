const nodemailer = require("nodemailer");

const sendEmail = async (to, link) => {
  try {
    const expiresAt = new Date(Date.now() + 60 * 1000).toLocaleTimeString();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Magic_Link" <no-reply@magiclink.com> `,
      to,
      subject: "🔐 Secure Login Link (Valid for 1 Minute)",

      html: `
  <div style="font-family: Times New Roman, sans-serif;">
    <h2>Welcome to Magic_Link 👋</h2>
    <p>You requested a secure login link.</p>

    <p>
      <strong>This link is valid for only 1 Minute.</strong>
    </p>

    <a 
      href="${link}"
    >
    ${link}
    </a>

    <p style="color: red;">
      ⚠️ Do not share this link with anyone.
    </p>
    <p>
      <strong>
         Expires at: ${expiresAt}
       </strong>
    </p>

    <p>If you did not request this login, please ignore this email.</p>

    <p> 
      <strong>
         Magic_Link Team
      </strong>
    </p>
  </div>
   `,
    });
    {
      /* <a 
      href="${link}"
      style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #2563eb;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        margin: 10px 0;
      "
    >
      Login Securely
    </a> */
    }
    console.log("✅ Email sent to:", to, expiresAt);
  } catch (error) {
    console.error("❌ Email error:", error);
    throw error;
  }
};

module.exports = sendEmail;
