import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

load_dotenv()

def send_reset_email(to_email: str, reset_link: str):
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = os.getenv("SMTP_PORT")
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    print(smtp_password,smtp_port,smtp_server,smtp_username)
    if None in [smtp_server, smtp_port, smtp_username, smtp_password]:
        raise EnvironmentError("SMTP configuration not found in .env file")

    # Create message container
    msg = MIMEMultipart('alternative')
    msg['From'] = smtp_username
    msg['To'] = to_email
    msg['Subject'] = "Reset your Login Credentials"

    # Create the HTML content for the email
    html_content = f"""
    <html>
    <body style="font-family:montserrat; text-align: center;">
        <img src="https://res.cloudinary.com/dtk8amipr/image/upload/v1704668946/logo-no-background_ekm7jh.png" alt="Hiro Logo" style="width: 150px; height: 100px;object-fit:contain;">
        <h2>Reset your Login Credentials</h2>
        <p>Hello there!</p>
        <p>We hope this message finds you well. You've requested to reset your password for Hiro, your mental health bot.</p>
        <p>Click the following link to reset your password:</p>
        <p><a href="{reset_link}" style="text-decoration: none; color: #3498db;">Reset Password</a></p>
        <p>This magic link is valid for 10 minutes only.</p>
        <p>If you didn't request this, no worries! Your account is still safe and sound.</p>
        <p>Stay positive and take care of yourself!</p>
        <p>Best regards,<br>Team Hiro</p>
    </body>
    </html>
    """

    # Attach HTML content to the email
    msg.attach(MIMEText(html_content, 'html'))

    # Connect to the SMTP server
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()  # Upgrade the connection to a secure TLS connection
        server.login(smtp_username, smtp_password)  # Login to the SMTP server
        server.sendmail(smtp_username, to_email, msg.as_string())  # Send the email

# Usage example:
# send_reset_email("recipient@example.com", "https://example.com/reset/123456")
