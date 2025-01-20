// import React, { useState } from 'react';
// import API_URL from '../helpers/Config';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { toast } from 'react-toastify';

// const Report = () => {
//     const [file, setFile] = useState(null);
//     const [reportSummary, setReportSummary] = useState('');
//     const [chartData, setChartData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [previewUrl, setPreviewUrl] = useState(null);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
        
//         // Reset states when new file is selected
//         setFile(selectedFile);
//         setReportSummary('');
//         setChartData(null);
        
//         // Create preview URL for the image
//         if (selectedFile) {
//             const url = URL.createObjectURL(selectedFile);
//             setPreviewUrl(url);
//         } else {
//             setPreviewUrl(null);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!file) {
//             toast.error('Please select a file to upload.');
//             return;
//         }

//         // Validate file type
//         if (!file.type.startsWith('image/')) {
//             toast.error('Please upload an image file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             setLoading(true);
//             const response = await fetch(`${API_URL}/reports/generate`, {
//                 method: 'POST',
//                 body: formData,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 // Handle specific error cases
//                 if (response.status === 400 && data.error === 'Invalid report format') {
//                     toast.error('The uploaded image is not a valid medical report. Please upload a clear image of a medical/blood test report.');
//                     setReportSummary('');
//                     setChartData(null);
//                     return;
//                 }
//                 throw new Error(data.message || 'Failed to generate report');
//             }

//             setReportSummary(data.reportSummary);
//             setChartData(data.chartData);
//             toast.success('Report generated successfully');
//         } catch (err) {
//             console.error('Error:', err.message);
//             toast.error(err.message || 'Failed to generate the report. Please try again.');
//             setReportSummary('');
//             setChartData(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section id="report" className="py-20 bg-gray-50 min-h-[95vh]">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-5xl font-bold text-center text-[#14737e] mt-12 mb-12">Generate Report</h2>
                
//                 <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-10 max-w-xl mx-auto">
//                     <div className="mb-8">
//                         <label htmlFor="file" className="block text-xl font-bold text-gray-800 mb-3">
//                             Upload Medical Report Image
//                         </label>
//                         <div className="space-y-4">
//                             <input
//                                 type="file"
//                                 id="file"
//                                 accept="image/*"
//                                 onChange={handleFileChange}
//                                 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-[#14737e] focus:border-[#14737e] p-2"
//                             />
//                             {previewUrl && (
//                                 <div className="mt-4">
//                                     <p className="text-sm text-gray-600 mb-2">Selected Image Preview:</p>
//                                     <img 
//                                         src={previewUrl} 
//                                         alt="Report preview" 
//                                         className="max-w-full h-auto max-h-48 object-contain rounded-lg border border-gray-200"
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
                    
//                     <button
//                         type="submit"
//                         className="w-full bg-[#14737e] text-white font-medium py-3 px-5 rounded-lg hover:bg-[#125e55] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={loading || !file}
//                     >
//                         {loading ? (
//                             <span className="flex items-center justify-center">
//                                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                                 </svg>
//                                 Analyzing Report...
//                             </span>
//                         ) : (
//                             'Generate Report'
//                         )}
//                     </button>
//                 </form>

//                 {reportSummary && (
//                     <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
//                         <h3 className="text-2xl font-bold text-[#14737e] mb-4">Report Analysis</h3>
//                         <p className="text-gray-700 whitespace-pre-wrap">{reportSummary}</p>
//                     </div>
//                 )}

//                 {chartData && (
//                     <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
//                         <h3 className="text-2xl font-bold text-[#14737e] mb-4">Visual Representation</h3>
//                         <div className="w-full">
//                             <ResponsiveContainer width="100%" height={400}>
//                                 <BarChart data={chartData}>
//                                     <CartesianGrid strokeDasharray="2 2" />
//                                     <XAxis dataKey="name" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Bar dataKey="value" fill="#14737e" name="Actual Value" />
//                                     <Bar dataKey="normalvalue" fill="#82ca9d" name="Normal Value" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default Report;
import React, { useState, useEffect } from 'react';
import API_URL from '../helpers/Config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const Report = () => {
    const [file, setFile] = useState(null);
    const [reportSummary, setReportSummary] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isValidReport, setIsValidReport] = useState(true);

    useEffect(() => {
        // Cleanup preview URL when component unmounts or when file changes
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        // Reset states when new file is selected
        setFile(selectedFile);
        setReportSummary('');
        setChartData(null);
        setIsValidReport(true);
        
        // Cleanup previous preview URL if exists
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        
        // Create preview URL for the image
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file.');
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

            const data = await response.json();

            if (!response.ok) {
                // Handle specific error cases
                if (response.status === 400 && data.error === 'Invalid report format') {
                    toast.error('The uploaded image is not a valid medical report. Please upload a clear image of a medical/blood test report.');
                    setReportSummary('');
                    setChartData(null);
                    return;
                }
                throw new Error(data.message || 'Failed to generate report');
            }

            // Check if the response indicates this is not a valid report
            if (data.reportSummary?.includes('not appear to be a medical report')) {
                setIsValidReport(false);
                setChartData(null);
            } else {
                setIsValidReport(true);
                setChartData(data.chartData);
                toast.success('Report generated successfully');
            }

            setReportSummary(data.reportSummary);
            
        } catch (err) {
            console.error('Error:', err.message);
            toast.error(err.message || 'Failed to generate the report. Please try again.');
            setReportSummary('');
            setChartData(null);
            setIsValidReport(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="report" className="py-20 bg-gray-50 min-h-[95vh]">
            <div className="container mx-auto px-6">
                <h2 className="text-5xl font-bold text-center text-[#14737e] mt-12 mb-12">Generate Report</h2>
                
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-10 max-w-xl mx-auto">
                    <div className="mb-8">
                        <label htmlFor="file" className="block text-xl font-bold text-gray-800 mb-3">
                            Upload Medical Report Image
                        </label>
                        <div className="space-y-4">
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-[#14737e] focus:border-[#14737e] p-2"
                            />
                            {previewUrl && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Selected Image Preview:</p>
                                    <img 
                                        src={previewUrl} 
                                        alt="Report preview" 
                                        className="max-w-full h-auto max-h-48 object-contain rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-[#14737e] text-white font-medium py-3 px-5 rounded-lg hover:bg-[#125e55] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading || !file}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Analyzing Report...
                            </span>
                        ) : (
                            'Generate Report'
                        )}
                    </button>
                </form>

                {reportSummary && (
                    <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-[#14737e] mb-4">
                            {isValidReport ? "Report Analysis" : "Invalid Report"}
                        </h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{reportSummary}</p>
                    </div>
                )}

                {chartData && isValidReport && (
                    <div className="mt-12 bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-[#14737e] mb-4">Visual Representation</h3>
                        <div className="w-full">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#14737e" name="Actual Value" />
                                    <Bar dataKey="normalvalue" fill="#82ca9d" name="Normal Value" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Report;