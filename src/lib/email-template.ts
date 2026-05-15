export const getBroadcastEmailTemplate = (subject: string, message: string, name?: string) => {
  // Use absolute production URL for logo image
  const baseUrl = 'https://webiss.shop';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      background-color: #030508;
      color: #ffffff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    
    .wrapper {
      width: 100%;
      background-color: #030508;
      padding: 60px 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #030508;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .logo-img {
      max-width: 120px;
      height: auto;
      display: block;
      margin: 0 auto;
    }
    
    .card {
      background: #0a0d10;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 48px 40px;
      margin-bottom: 40px;
      box-shadow: 0 0 30px rgba(0, 212, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      text-align: center;
    }
    
    .greeting {
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 24px;
      color: #ffffff;
      letter-spacing: -0.01em;
    }
    
    .message {
      font-size: 15px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 32px;
      white-space: pre-line;
    }
    
    .custom-message {
      font-size: 15px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      white-space: pre-line;
    }

    .cta-container {
      margin-top: 40px;
    }

    .cta-button {
      display: inline-block;
      background-color: #ffffff;
      color: #030508;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 30px;
      transition: all 0.3s ease;
    }
    
    .footer {
      text-align: center;
      padding-top: 30px;
    }
    
    .footer-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.3);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    
    .social-links {
      margin-top: 24px;
    }
    
    .social-link {
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      font-size: 12px;
      margin: 0 12px;
      font-family: 'Space Grotesk', sans-serif;
      letter-spacing: 0.05em;
    }

    .unsub {
      margin-top: 30px;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.2);
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030508; background-image: linear-gradient(#030508, #030508); color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <div class="wrapper" style="width: 100%; background-color: #030508; background-image: linear-gradient(#030508, #030508); padding: 60px 0;">
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #030508; background-image: linear-gradient(#030508, #030508);">
      <div class="header" style="text-align: center; margin-bottom: 40px;">
        <img src="${baseUrl}/logo.png" alt="WEBIS" class="logo-img" style="max-width: 120px; height: auto; display: block; margin: 0 auto;" />
      </div>
      
      <div class="card" style="background-color: #0a0d10; background-image: linear-gradient(#0a0d10, #0a0d10); border: 1px solid #1a1a1a; border-radius: 12px; padding: 48px 40px; margin-bottom: 40px; text-align: center; box-shadow: 0 0 30px rgba(0, 212, 255, 0.05);">
        <div class="greeting" style="font-size: 18px; margin-bottom: 24px; color: #ffffff !important;">
          ${name ? `Dear ${name},` : 'Hello,'}
        </div>
        
        <div class="message" style="font-size: 15px; line-height: 1.8; color: #ffffff !important; margin-bottom: 32px; white-space: pre-line;">
          ${message}
        </div>
        
        <div class="custom-message" style="font-size: 15px; line-height: 1.8; color: #ffffff !important; margin-top: 32px; padding-top: 32px; border-top: 1px solid #1a1a1a; white-space: pre-line;">
Thank you for connecting with WEBIS.

Our team will shortly connect with you to build something better together.

We appreciate your interest and support.
        </div>
        
        <div style="margin-top: 32px; padding: 24px; background-color: rgba(0, 212, 255, 0.05); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.2); font-size: 16px; font-weight: 600; color: #00d4ff !important; line-height: 1.6; text-align: left;">
          ⚠️ IMPORTANT: Please check your Spam or Junk folder. If this email landed there, mark it as "Not Spam" so you never miss an update from us!
        </div>
        
        <div style="margin-top: 40px; font-weight: 500; color: #ffffff !important; font-size: 14px;">
          — WEBIS STUDIO
        </div>
      </div>
      
      <div class="footer" style="text-align: center; padding-top: 30px;">
        <div class="footer-text" style="font-size: 11px; color: rgba(255, 255, 255, 0.5) !important; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">
          © ${new Date().getFullYear()} WEBIS. ALL RIGHTS RESERVED.
        </div>
        <div class="social-links" style="margin-top: 24px;">
          <a href="#" class="social-link" style="color: rgba(255, 255, 255, 0.7) !important; text-decoration: none; font-size: 12px; margin: 0 12px; letter-spacing: 0.05em;">WEBSITE</a>
          <a href="#" class="social-link" style="color: rgba(255, 255, 255, 0.7) !important; text-decoration: none; font-size: 12px; margin: 0 12px; letter-spacing: 0.05em;">INSTAGRAM</a>
          <a href="#" class="social-link" style="color: rgba(255, 255, 255, 0.7) !important; text-decoration: none; font-size: 12px; margin: 0 12px; letter-spacing: 0.05em;">TWITTER</a>
        </div>
        <div class="unsub" style="margin-top: 30px; font-size: 11px; color: rgba(255, 255, 255, 0.3) !important;">
          If you prefer not to receive these emails, you can unsubscribe at any time.
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;
};
