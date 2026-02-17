const passwordResetTemplate = (name, url) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #FF5722; margin-bottom: 20px; }
        .header h1 { color: #FF5722; margin: 0; }
        .content { padding: 0 10px; }
        .button-container { text-align: center; margin: 30px 0; }
        .button { background-color: #FF5722; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>We received a request to reset your password for your DayPlanner account.</p>
          <p>Click the button below to reset your password:</p>
          <div class="button-container">
            <a href="${url}" class="button">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} DayPlanner. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = passwordResetTemplate;
