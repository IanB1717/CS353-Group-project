import os
import smtplib
import json
from email.message import EmailMessage

EMAIL_ADDRESS = os.environ.get('EMAIL_USER')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASS')

#delete below 
before = {
  "email": "gemma@pallas.ie",
  "subject": "Courtyard order",
  "body": "Chips,Lettuce,Carrots"
}

after = json.dumps(before)
#delete above

data = json.loads(after)
reciever = data["email"]
subject = data["subject"]
body = data["body"]

message = EmailMessage()
message['Subject'] = subject
message['From'] = EMAIL_ADDRESS
message['To'] = reciever
message.set_content(body)

with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
    smtp.login(EMAIL_ADDRESS,EMAIL_PASSWORD)

    smtp.send_message(message)