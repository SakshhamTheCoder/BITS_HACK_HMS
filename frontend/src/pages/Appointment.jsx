import { auth } from '../helpers/firebase';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../helpers/Config';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/appointments/cancel/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel: ${response.statusText}`);
      }

      const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
      setAppointments(updatedAppointments);
    } catch (err) {
      console.error('Error canceling appointment:', err.message);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/appointments/${userId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setAppointments([]);
            setLoading(false);
          } else {
            throw new Error(`Failed to fetch: ${response.statusText}`);
          }
          return;
        }

        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-teal-800 font-semibold">Loading your appointments...</p>
      </div>
    );
  }

  return (
    <section id="dashboard" className="py-20 bg-white min-h-[95vh]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold font-sans text-center text-teal-800 mb-8">Your Appointments</h2>
        <div className="text-center mb-8">
          <Link
            to="/appointment/schedule"
            className="px-4 py-2 bg-teal-800 text-white rounded-md hover:bg-teal-700 transition duration-300"
          >
            Schedule Appointment
          </Link>
        </div>
        <div className="px-10 py-6">
          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-teal-50 shadow-md rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-teal-800 mb-3">
                    Appointment with {appointment.doctorName} at {appointment.hospitalName}
                  </h3>
                  <p className="text-teal-600 mb-4">Date: {appointment.appointmentDate}</p>
                  <p className="text-teal-600 mb-4">Time: {appointment.appointmentTime}</p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300" onClick={() => cancelAppointment(appointment.id)}>
                    Cancel Appointment
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-red-700">
              You have no appointments scheduled at the moment.
            </p>
          )}

        </div>
      </div>
    </section>
  );
};

export default Appointment;
