import React, { useState, useEffect } from "react";
import { auth } from "../helpers/firebase";
import API_URL from "../helpers/Config";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Schedule = () => {
    const [hospitalId, setHospitalId] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [hospitals, setHospitals] = useState([]); // State for holding hospitals
    const [doctors, setDoctors] = useState([]); // State for holding doctors for the selected hospital
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const userId = auth.currentUser?.uid;

    // Fetch hospital names on component mount
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch(`${API_URL}/saved-hospitals/${userId}`);
                if (response.status === 404) {
                    toast.error("No saved hospitals found. Please locate hospitals first by exploring nearby hospitals.");
                    navigate("/nearby");
                    return;
                }
                const data = await response.json();
                setHospitals(data); // Assume response contains an array of hospitals
            } catch (err) {
                console.error("Error fetching hospitals:", err.message);
                toast.error('Failed to fetch hospitals. Please try again.');
            }
        };

        fetchHospitals();
    }, [userId]);

    // Function to randomize the doctors list
    const randomizeDoctors = (hospitalId) => {
        // Mock doctors data, should be fetched from the selected hospital
        const allDoctors = [
            { name: "Dr. John Doe", specialty: "Cardiologist" },
            { name: "Dr. Jane Smith", specialty: "Dermatologist" },
            { name: "Dr. Alan Walker", specialty: "Orthopedic" },
            { name: "Dr. Emily White", specialty: "Pediatrician" },
            { name: "Dr. Michael Brown", specialty: "Neurologist" },
        ];

        // Shuffle the doctors list randomly
        const shuffledDoctors = allDoctors.sort(() => Math.random() - 0.5);
        setDoctors(shuffledDoctors);
    };

    // Handle hospital selection
    const handleHospitalChange = (e) => {
        const selectedHospitalId = e.target.value;
        setHospitalId(selectedHospitalId);

        if (selectedHospitalId) {
            // Fetch and randomize doctors when a hospital is selected
            randomizeDoctors(selectedHospitalId);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!userId) {
            setMessage("User not authenticated.");
            setLoading(false);
            return;
        }

        const appointmentData = {
            userId,
            hospitalId,
            doctorName: doctorName.split(" - ")[0],
            appointmentDate,
            appointmentTime,
        };

        try {
            const response = await fetch(`${API_URL}/appointments/schedule`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Appointment scheduled successfully! ID: ${data.id}`);
            } else {
                const error = await response.json();
                setMessage(`Error: ${error.message}`);
            }
        } catch (err) {
            console.error("Error scheduling appointment:", err.message);
            setMessage("Error scheduling appointment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-white pt-28">
            <div className="container mx-auto max-w-lg px-4">
                <h2 className="text-4xl font-bold text-[#004D40] text-center mb-8">Schedule an Appointment</h2>
                <form onSubmit={handleSubmit} className="bg-teal-50 p-6 rounded-lg shadow-md">
                    {/* Hospital Dropdown */}
                    <div className="mb-4">
                        <label className="block text-teal-800 font-semibold mb-2">Select Hospital</label>
                        <select
                            value={hospitalId}
                            onChange={handleHospitalChange}
                            className="w-full p-2 border border-teal-300 rounded-md"
                            required
                        >
                            <option value="">Select a hospital</option>
                            {hospitals.map((hospital) => (
                                <option key={hospital.id} value={hospital.id}>
                                    {hospital.tags.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Doctor Dropdown */}
                    <div className="mb-4">
                        <label className="block text-teal-800 font-semibold mb-2">Select Doctor</label>
                        <select
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                            className="w-full p-2 border border-teal-300 rounded-md"
                            required
                        >
                            <option value="">Select a doctor</option>
                            {doctors.map((doctor, index) => (
                                <option key={index} value={`${doctor.name}`}>
                                    {doctor.name} - {doctor.specialty}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Appointment Date */}
                    <div className="mb-4">
                        <label className="block text-teal-800 font-semibold mb-2">Appointment Date</label>
                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            className="w-full p-2 border border-teal-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Appointment Time */}
                    <div className="mb-4">
                        <label className="block text-teal-800 font-semibold mb-2">Appointment Time</label>
                        <input
                            type="time"
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
                            className="w-full p-2 border border-teal-300 rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-700 text-white py-2 rounded-lg shadow-md hover:bg-teal-800 transition-all"
                        disabled={loading}
                    >
                        {loading ? "Scheduling..." : "Schedule Appointment"}
                    </button>
                </form>
                {message && (
                    <p className={`text-center mt-4 ${message.includes("successfully") ? "text-green-700" : "text-red-700"}`}>
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
};

export default Schedule;