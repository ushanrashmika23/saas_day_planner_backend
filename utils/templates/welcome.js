const welcomeTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #4CAF50; margin-bottom: 20px; }
        .header h1 { color: #4CAF50; margin: 0; }
        .content { padding: 0 10px; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to DayPlanner!</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>We are thrilled to have you strictly on board! DayPlanner is designed to help you organize your life and boost your productivity.</p>
          <p>Here are a few things you can do to get started:</p>
          <ul>
            <li>Create your first project</li>
            <li>Add tasks and set deadlines</li>
            <li>Organize your day efficiently</li>
          </ul>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Happy Planning!</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} DayPlanner. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = welcomeTemplate;
