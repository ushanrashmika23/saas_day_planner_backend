const verificationTemplate = (name, url) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #007BFF; margin-bottom: 20px; }
        .header h1 { color: #007BFF; margin: 0; }
        .content { padding: 0 10px; }
        .button-container { text-align: center; margin: 30px 0; }
        .button { background-color: #007BFF; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Verify Your Email</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Thank you for signing up for DayPlanner. To complete your registration and verify your account, please click the button below:</p>
          <div class="button-container">
            <a href="${url}" class="button">Verify Email Address</a>
          </div>
          <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
          <p><a href="${url}">${url}</a></p>
          <p>If you did not create an account, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} DayPlanner. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = verificationTemplate;
