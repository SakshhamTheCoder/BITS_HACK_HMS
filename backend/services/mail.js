const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { firestore } = require('./firebase'); // Adjust import as needed

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
        user: 'email', // Your email
        pass: 'pass', // Your email password or app password
    },
});

// Function to check for upcoming appointments and send reminders
const checkAndSendReminders = async () => {
    try {
        const now = new Date();
        const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

        // Fetch all appointments
        const snapshot = await firestore.collection('appointments').get();

        if (snapshot.empty) {
            console.log('No appointments found');
            return;
        }

        const upcomingAppointments = [];

        // Filter appointments that are within the next 2 hours
        snapshot.forEach((doc) => {
            const appointment = doc.data();
            const appointmentTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);

            if (appointmentTime > now && appointmentTime <= twoHoursLater && !appointment.reminderSent) {
                upcomingAppointments.push({ id: doc.id, ...appointment });
            }
        });

        // Send email reminders and mark appointments as "reminderSent"
        for (const appointment of upcomingAppointments) {
            const userDoc = await firestore.collection('users').doc(appointment.userId).get();
            if (!userDoc.exists) continue;

            const userEmail = await firestore
                .collection('users')
                .doc(appointment.userId)
                .get()
                .then((doc) => doc.data().email);

            // Send email
            const mailOptions = {
                from: 'email',
                to: userEmail,
                subject: 'Upcoming Appointment Reminder',
                text: `Hello! This is a reminder for your upcoming appointment with Dr. ${appointment.doctorName} at ${appointment.appointmentTime}.`,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Reminder sent to ${userEmail}`);

            // Update appointment to mark reminder as sent
            await firestore.collection('appointments').doc(appointment.id).update({
                reminderSent: true,
            });
        }
    } catch (error) {
        console.error('Error checking appointments or sending reminders:', error.message);
    }
};

function startReminderService() {
    cron.schedule('*/2 * * * *', checkAndSendReminders);
    console.log('Reminder service started');
}

module.exports = startReminderService;

