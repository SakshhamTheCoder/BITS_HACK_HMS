
import React, { useState } from 'react';
import API_URL from '../helpers/Config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Report = () => {
    const [file, setFile] = useState(null);
    const [reportSummary, setReportSummary] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/reports/generate`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error generating report: ${response.statusText}`);
            }

            const data = await response.json();
            setReportSummary(data.reportSummary);
            setChartData(data.chartData);
        } catch (err) {
            console.error('Error:', err.message);
            alert('Failed to generate the report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="report" className="py-20 bg-gray-50 min-h-[95vh]">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Generate Report</h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto"
                >
                    <div className="mb-6">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                </form>
                {reportSummary && (
                    <div className="mt-10 bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Report</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{reportSummary}</p>
                    </div>
                )}
                {chartData && (
                    <div className='w-full mt-10'>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                                <Bar dataKey="normalvalue" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )
                }
            </div>
        </section>
    );
};

export default Report;