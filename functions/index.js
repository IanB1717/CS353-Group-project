'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

var goMail = function (message) {
    console.log(message.reciever);
    console.log(message.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chefcity.orders@gmail.com',
            pass: 'group12353'
        }
    });

    var reciever = message.reciever;
    var body = message.body;
    
    const mailOptions = {
        from: 'chefcity.orders@gmail.com', 
        to: reciever, 
        subject: 'Order', 
        text: body
    };

    //this is callback function to return status to firebase console
    const getDeliveryStatus = function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    };

    //call of this function send an email, and return status
    transporter.sendMail(mailOptions, getDeliveryStatus);
};

exports.onNewOrder = functions.firestore.document('Orders/{orderId}').onCreate((snap, context) => {
    const newOrder = snap.data();
    console.log(newOrder);
    goMail(newOrder.Order);
});





