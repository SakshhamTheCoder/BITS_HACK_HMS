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
<section id="dashboard" className="py-20 bg-gray-100 min-h-[95vh]">
  <div className="container mx-auto px-6">
    <h2 className="text-5xl font-bold text-center text-[#14737e] mt-12 mb-12">Your Appointments</h2>
    <div className="text-center mb-8">
      <Link
        to="/appointment/schedule"
        className="px-6 py-3 bg-[#14737e] text-white rounded-lg hover:bg-[#125e55] transition duration-300 shadow-md"
      >
        Schedule Appointment
      </Link>
    </div>
    <div className="bg-white rounded-lg shadow-md px-8 py-10">
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-gray-100 shadow-lg rounded-lg p-6 text-center hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-[#14737e] mb-4">
                Appointment with {appointment.doctorName}
              </h3>
              <p className="text-gray-700 mb-2">Hospital: {appointment.hospitalName}</p>
              <p className="text-gray-700 mb-2">Date: {appointment.appointmentDate}</p>
              <p className="text-gray-700 mb-4">Time: {appointment.appointmentTime}</p>
              <button
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 shadow-md"
                onClick={() => cancelAppointment(appointment.id)}
              >
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-700 text-xl font-semibold">
          You have no appointments scheduled at the moment.
        </p>
      )}
    </div>
  </div>
</section>

  );
};

export default Appointment;
