const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API endpoint to save consultation
app.post('/api/consultations', async (req, res) => {
    const { fullName, phone, email, consultationType, message } = req.body;

    const query = `
        INSERT INTO client_consultations 
        (full_name, phone_number, email, consultation_type, message)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [fullName, phone, email, consultationType, message], 
        async (error, results) => {
            if (error) {
                console.error('Error saving consultation:', error);
                return res.status(500).json({ error: 'Failed to save consultation' });
            }

            // Send email notification
            try {
                await sendNotificationEmail(fullName, email);
                await sendAdminNotification(fullName, phone);
                
                res.status(200).json({ 
                    message: 'Consultation saved successfully',
                    consultationId: results.insertId 
                });
            } catch (emailError) {
                console.error('Error sending notification:', emailError);
                res.status(200).json({ 
                    message: 'Consultation saved but notification failed',
                    consultationId: results.insertId 
                });
            }
        });
});

// Email notification functions
async function sendNotificationEmail(name, email) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Consultation Request Received - Saraswat & Singh',
        html: `
            <h2>Thank you for your consultation request</h2>
            <p>Dear ${name},</p>
            <p>We have received your consultation request. Our team will contact you shortly.</p>
            <p>Consultation Fee: ₹500</p>
            <p>Please make the payment to proceed with scheduling.</p>
            <p>Bank Details:</p>
            <p>Account Name: Saraswat & Singh Law Associates</p>
            <p>Bank Name: [Bank Name]</p>
            <p>Account No: XXXX XXXX XXXX</p>
            <p>IFSC Code: XXXXX0000XXX</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

async function sendAdminNotification(name, phone) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'info@saraswatsinghlaw.com',
        subject: 'New Consultation Request',
        html: `
            <h2>New Consultation Request</h2>
            <p>Client Name: ${name}</p>
            <p>Phone: ${phone}</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

// Add this to server.js
app.get('/api/consultations', (req, res) => {
    const query = 'SELECT * FROM client_consultations ORDER BY consultation_date DESC';
    
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching consultations:', error);
            return res.status(500).json({ error: 'Failed to fetch consultations' });
        }
        res.json(results);
    });
});

// Delete consultation
app.delete('/api/consultations/:id', async (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM client_consultations WHERE id = ?';
    
    db.query(query, [id], async (error, results) => {
        if (error) {
            console.error('Error deleting consultation:', error);
            return res.status(500).json({ error: 'Failed to delete consultation' });
        }

        // Send deletion notification
        try {
            await sendDeletionNotification(id);
            res.json({ message: 'Consultation deleted successfully' });
        } catch (emailError) {
            console.error('Error sending deletion notification:', emailError);
            res.json({ message: 'Consultation deleted but notification failed' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
