const { firestore } = require('../services/firebase');

// Schedule an appointment
const scheduleAppointment = async (req, res) => {
    const { userId, hospitalId, doctorName, appointmentDate, appointmentTime } = req.body;

    try {
        const appointment = {
            userId,
            hospitalId,
            doctorName: doctorName || 'Not Assigned',
            appointmentDate,
            appointmentTime,
            status: 'scheduled',
        };

        const docRef = await firestore.collection('appointments').add(appointment);
        res.status(200).json({ message: 'Appointment scheduled successfully', id: docRef.id });
    } catch (error) {
        console.error('Error scheduling appointment:', error.message);
        res.status(500).json({ message: 'Error scheduling appointment', error });
    }
};

// Get all appointments for a user
const getAppointments = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch appointments for the user
        const snapshot = await firestore.collection('appointments').where('userId', '==', userId).get();
        if (snapshot.empty) {
            return res.status(404).json({ message: 'No appointments found' });
        }

        // Fetch user hospitals data once
        const userDoc = await firestore.collection('data').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User data not found' });
        }

        const userData = userDoc.data();
        const hospitals = userData?.hospitals || [];

        // Prepare appointments with hospital name
        const appointments = snapshot.docs.map((doc) => {
            const appointmentData = doc.data();
            const hospitalId = appointmentData.hospitalId;

            // Find hospital by hospitalId
            const hospital = hospitals.find((h) => parseInt(h.id) === parseInt(hospitalId));
            console.log('hospital:', hospital);

            const hospitalName = hospital ? hospital.tags?.name : 'Unknown Hospital';

            return {
                id: doc.id,
                ...appointmentData,
                hospitalName,
            };
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error.message);
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        await firestore.collection('appointments').doc(appointmentId).delete();
        res.status(200).json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        console.error('Error canceling appointment:', error.message);
        res.status(500).json({ message: 'Error canceling appointment', error });
    }
};

// Mock data
const mockAppointments = [
    {
        userId: 'user_1',
        hospitalId: 'hospital_123',
        doctorName: 'Dr. Smith',
        appointmentDate: '2024-12-25',
        appointmentTime: '10:00 AM',
        status: 'scheduled',
    },
    {
        userId: 'user_2',
        hospitalId: 'hospital_456',
        doctorName: 'Dr. Lee',
        appointmentDate: '2024-12-26',
        appointmentTime: '2:00 PM',
        status: 'scheduled',
    },
];

// Add mock data
const addMockData = async (req, res) => {
    try {
        const batch = firestore.batch();
        mockAppointments.forEach((appointment) => {
            const docRef = firestore.collection('appointments').doc(); // Auto-generate document ID
            batch.set(docRef, appointment);
        });
        await batch.commit();
        res.status(200).json({ message: 'Mock data added successfully!' });
    } catch (error) {
        console.error('Error adding mock data:', error.message);
        res.status(500).json({ error: 'Error adding mock data' });
    }
};

module.exports = {
    scheduleAppointment,
    getAppointments,
    cancelAppointment,
    addMockData,
};

