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
            `Generate a summary report for this doctor report. Explain everything in simple terms. 
            Exclude the name, lab, date, and patient name. Use simple language only. 
            Do not include notes, introductions, or generic phrases like "Here's a summary of the blood report." 
            Focus solely on key findings and recommendations. Dont add any text features like bold italics. keep it simple and possibly in bullets if possible`,
        ];

        const result = await model.generateContent(prompt);

        if (!result || !result.response) {
            return res.status(500).json({ error: 'Failed to generate report' });
        }

        res.status(200).json({ report: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    generateReportByImage,
};

