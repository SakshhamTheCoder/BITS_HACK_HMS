const { firestore } = require('../services/firebase');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

const generateReportByImage = async (req, res) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const base64Image = file.buffer.toString('base64');

        const prompt = [
            {
                inlineData: {
                    data: base64Image,
                    mimeType: 'image/jpeg',
                },
            },
            `Analyze this blood test report and provide only the abnormal findings:

            List only values that are:
            - Above normal range (marked H or high)
            - Below normal range (marked L or low)

            For each abnormal value, include:
            - The test name in simple terms
            - The actual value
            - The normal range
            - A brief, one-line explanation of what this might mean

            Keep the language simple and concise. Exclude all normal results and administrative details.
            Avoid including notes, introductions, or generic phrases like 'Here's a summary of the blood report.'
            Focus exclusively on key findings and actionable recommendations.
            Format the output as follows:
            Summary: Provide the main points in bullet format without any stylistic elements like bold or italics.
            Chart Data: Present numerical or chart-related information in a structured JSON format, specifying labels and corresponding values.
            Example Output:

            Summary:  
            - Finding 1: [Description of the finding].  
            - Finding 2: [Description of the finding].
            - Finding 3: [Description of the finding].
            - Finding 4: [Description of the finding].
            - Finding 5: [Description of the finding].
            - Recommendation: [Recommendation based on findings].  

            Chart Data:  
            [
            {
                name: "field1",
                value:"value"
                normalvalue: "normal value"
            },
            {
                name: "field2",
                value:"value"
                normalvalue: "normal value"
            },
            ]
            Do not put the chart data in codeblocks or quotes. Chart Data should have almost everything present in the report rather than only abnormal results. Normal value should be a single average value for the test.
            Ensure strict adherence to this structure for every response, keeping both summary and chart data aligned.`,
        ];

        const result = await model.generateContent(prompt);

        if (!result || !result.response) {
            return res.status(500).json({ error: 'Failed to generate report' });
        }

        const responseText = result.response.candidates[0].content.parts[0].text;

        const [summaryPart, chartDataPart] = responseText.split('Chart Data:');
        const chartData = chartDataPart ? JSON.parse(chartDataPart.trim()) : {};

        res.status(200).json({
            reportSummary: summaryPart ? summaryPart.replace('Summary:', '').trim() : '',
            chartData,
        });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    generateReportByImage,
};

