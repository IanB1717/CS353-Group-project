from flask import Flask, request, render_template
import os
import sys
import smtplib
import json
from email.message import EmailMessage

app = Flask(__name__)
EMAIL_ADDRESS = os.environ.get('EMAIL_USER')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASS')

@app.route('/receiver', methods = ['POST'])
def worker():
	data = request.get_json()
	result = ''

	for item in data:
		result += str(item['make']) + '\n'

	return result

if __name__ == '__main__':
	app.run()

data = json.loads(worker())
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