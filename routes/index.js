const express = require('express');
const router = express.Router();

// Nodemailer
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
}

const transport = nodemailer.createTransport(mailgun(auth));

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', (req, res) => {
    const { email, name, phone } = req.body;

    const mailOptions = {
        from: `${name} < ${email} >`,
        to: 'sandy@eastlondonrealtors.co.za',
        subject: `${name} Has Requested a Callback`,
        html: generateHtmlEmail(email, name, phone)
    }

    transport.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ response: 'fail' });
        } else {
            res.status(200).json({ response: 'sent' });
        }
    })
});

function generateHtmlEmail(email, name, phone) {
    const phoneWithCode = `+27${phone.substring(1)}`;

    let htmlEmail = '<div style="max-width: 600px; background-color: #ffde32; padding: 3rem; font-family: sans-serif; margin: 0 auto; border-radius: 1rem;">';
    htmlEmail += '<h1 style="font-size: 3rem; color: #333;">Hi, Sandy!</h1>';
    htmlEmail += `<p style="font-size: 1.5rem; color: #333;"><strong>${name}</strong> has requested a callback.</p>`;
    htmlEmail += `<p style="font-size: 1.5rem; color: #333;"><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>`;
    htmlEmail += `<p style="font-size: 1.5rem; color: #333;"><strong>Contact Number:</strong> <a href="tel:${phoneWithCode}">${phone}</a></p>`;
    htmlEmail += '<h1 style="margin-top: 3rem; font-size: 2rem; color: #333;">Have a fantastic day!</h1>';

    return htmlEmail;
}

module.exports = router;