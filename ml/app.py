from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import logging

# Import services
from services.analyzer import HealthAnalyzer
from services.file_processor import FileProcessor
from services.firebase_utils import initialize_firebase  # Corrected import

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize services
health_analyzer = HealthAnalyzer()
file_processor = FileProcessor()

# Basic configuration
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    """Check if the file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "ok"})

@app.route('/analyze/text', methods=['POST'])
def analyze_text():
    """Analyze plain text."""
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        text = data['text']
        logger.info(f"Analyzing text of length: {len(text)}")

        # Analyze text and save results to Firebase
        results = health_analyzer.analyze_text(text)
        if health_analyzer.save_to_firebase(results):
            return jsonify({'success': True, 'data': results}), 200
        else:
            return jsonify({'error': 'Failed to save to Firebase'}), 500

    except Exception as e:
        logger.error(f"Error in text analysis: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/analyze/file', methods=['POST'])
def analyze_file():
    """Analyze text extracted from a file."""
    try:
        # Check if the file is present in the request
        if 'file' not in request.files:
            logger.error("No file part in the request")
            return jsonify({
                'success': False,
                'error': 'No file part in the request'
            }), 400

        file = request.files['file']
        logger.info(f"File: {file}, Filename: {file.filename}")

        # If filename is empty, return error
        if file.filename == '':
            logger.error("No file selected")
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400

        # Ensure the file is allowed
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

            # Save the file to the uploads folder
            logger.info(f"Saving file to {filepath}")
            file.save(filepath)
            
            try:
                # Extract text from the file using the filepath
                text = file_processor.extract_text(filepath)
                
                # Analyze the extracted text
                results = health_analyzer.analyze_text(text)
                
                # Clean up - remove the file after processing
                if os.path.exists(filepath):
                    os.remove(filepath)
                
                if health_analyzer.save_to_firebase(results):
                    return jsonify({'success': True, 'data': results}), 200
                else:
                    return jsonify({'error': 'Failed to save to Firebase'}), 500
            finally:
                # Ensure file cleanup happens even if processing fails
                if os.path.exists(filepath):
                    os.remove(filepath)
                    
        else:
            return jsonify({'error': 'Invalid file type'}), 400

    except Exception as e:
        logger.error(f"Error in file analysis: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure we are using the correct path for serviceAccountKey.json
    firebase_key_path = os.path.join(os.getcwd(), 'services', 'serviceAccountKey.json')
    logger.info(f"Using Firebase key from: {firebase_key_path}")

    # Check if the file exists
    if os.path.exists(firebase_key_path):
        logger.info("Initializing Firebase...")
        initialize_firebase(firebase_key_path)
    else:
        logger.error(f"Firebase key file not found at {firebase_key_path}")
        exit(1)

    logger.info("Starting ML service...")
    app.run(host='0.0.0.0', port=5001, debug=True)
