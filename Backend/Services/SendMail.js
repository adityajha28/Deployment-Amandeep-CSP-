const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const Project =require("../models/project")


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'amandeeprewani21@gmail.com', // Your email address
        pass: 'iygw uyyl qbrk vbpe'
    }
});


router.post('/send-email', async (req, res) => {
    try {
        // Send mail with defined transport object

        const projectId = req.body.projectId; // Assuming you pass the project ID in the request body
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).send('Project not found');
        }
        // Extract client email from project details
        const clientEmail = project.clientEmail;
        


        const emailBody = `
        Hello StakeHolder
        Please note that audit History has been completed and here is the audit summary:
        Audit History Details:
        Date of Audit: ${req.body.DateofAudit}
        Reviewed By: ${req.body.reviewedBy}
        Status: ${req.body.status}
        Reviewed Section: ${req.body.reviewedSection}
        Comments: ${req.body.comment}
        Action Items: ${req.body.actionItem}
        `;

        let info = await transporter.sendMail({
            from: 'amandeeprewani21@gmail.com', // sender address
            to: clientEmail, // list of receivers
            subject: req.body.subject, // Subject line
            text: emailBody // plain text body
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

module.exports=router