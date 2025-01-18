const express = require('express');
const { generateReportByImage } = require('../controllers/reportController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/generate', upload.single('image'), generateReportByImage);

module.exports = router;

