# file_processor.py
import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import os
import logging

logger = logging.getLogger(__name__)

class FileProcessor:
    def __init__(self):
        self._setup_tesseract()
        
    def _setup_tesseract(self):
        if os.name == 'nt':  # Windows
            tesseract_path = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
            if os.path.exists(tesseract_path):
                pytesseract.pytesseract.tesseract_cmd = tesseract_path
                logger.info("Tesseract path set successfully for Windows")
        else:  # Linux/Unix
            # On Linux, tesseract is usually in PATH
            if os.system('which tesseract') == 0:
                logger.info("Tesseract found in system PATH")
            else:
                raise RuntimeError("Tesseract not found in system PATH")

    def _find_poppler_path(self):
        """Find poppler path based on OS"""
        if os.name == 'nt':  # Windows
            base_path = r'C:\Program Files\poppler'
            try:
                poppler_dirs = [d for d in os.listdir(base_path) 
                              if os.path.isdir(os.path.join(base_path, d)) 
                              and d.startswith('poppler-')]
                
                if poppler_dirs:
                    latest_version = sorted(poppler_dirs)[-1]
                    version_path = os.path.join(base_path, latest_version)
                    
                    possible_paths = [
                        os.path.join(version_path, 'bin'),
                        os.path.join(version_path, 'Library', 'bin'),
                        version_path
                    ]
                    
                    for path in possible_paths:
                        if os.path.exists(os.path.join(path, 'pdftoppm.exe')):
                            return path
            except Exception as e:
                logger.error(f"Error finding Windows poppler path: {e}")
        
        return None  # Return None for Linux as poppler-utils will be in PATH
        
    def extract_text(self, filepath):
        try:
            _, file_extension = os.path.splitext(filepath)
            file_extension = file_extension.lower()
            
            if file_extension == '.pdf':
                return self._process_pdf(filepath)
            elif file_extension in ['.png', '.jpg', '.jpeg']:
                return self._process_image(filepath)
            else:
                raise ValueError(f'Unsupported file type: {file_extension}')
        except Exception as e:
            logger.error(f"Error in extract_text: {str(e)}")
            raise

    def _process_pdf(self, filepath):
        try:
            poppler_path = self._find_poppler_path() if os.name == 'nt' else None
            conversion_kwargs = {'dpi': 300, 'fmt': 'ppm', 'thread_count': os.cpu_count() or 1}
            
            if poppler_path:
                conversion_kwargs['poppler_path'] = poppler_path
            
            images = convert_from_path(filepath, **conversion_kwargs)
            
            text_parts = []
            for i, image in enumerate(images, 1):
                logger.info(f"Processing page {i} of PDF")
                text = pytesseract.image_to_string(image)
                if text.strip():
                    text_parts.append(text)
            
            return ' '.join(text_parts)
            
        except Exception as e:
            logger.error(f"Error processing PDF: {str(e)}")
            raise

    def __init__(self):
        # Set Tesseract path for Windows
        if os.name == 'nt':  # Windows
            tesseract_path = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
            if os.path.exists(tesseract_path):
                pytesseract.pytesseract.tesseract_cmd = tesseract_path
                logger.info("Tesseract path set successfully")
            else:
                logger.error(f"Tesseract not found at {tesseract_path}")
                raise RuntimeError(
                    "Tesseract not found. Please install it from: "
                    "https://github.com/UB-Mannheim/tesseract/wiki"
                )

    def _find_poppler_path(self):
        """Find poppler path based on installed version, handling different installation structures"""
        base_path = r'C:\Program Files\poppler'
        
        try:
            # List all directories in the poppler folder
            poppler_dirs = [d for d in os.listdir(base_path) 
                        if os.path.isdir(os.path.join(base_path, d)) 
                        and d.startswith('poppler-')]
            
            if poppler_dirs:
                # Use the latest version (assuming version numbers in folder names)
                latest_version = sorted(poppler_dirs)[-1]
                version_path = os.path.join(base_path, latest_version)
                
                # Check possible bin locations
                possible_paths = [
                    os.path.join(version_path, 'bin'),  # Direct bin folder
                    os.path.join(version_path, 'Library', 'bin'),  # Library/bin structure
                    version_path  # Base version path
                ]
                
                for path in possible_paths:
                    if os.path.exists(os.path.join(path, 'pdftoppm.exe')):
                        logger.info(f"Found poppler at: {path}")
                        return path
                
                logger.error(f"pdftoppm.exe not found in any expected locations under {version_path}")
            else:
                logger.error(f"No poppler directories found in {base_path}")
        
        except Exception as e:
            logger.error(f"Error finding poppler path: {e}")
        
        return None

    def extract_text(self, filepath):
        try:
            _, file_extension = os.path.splitext(filepath)
            file_extension = file_extension.lower()
            
            if file_extension == '.pdf':
                return self._process_pdf(filepath)
            elif file_extension in ['.png', '.jpg', '.jpeg']:
                return self._process_image(filepath)
            else:
                raise ValueError(f'Unsupported file type: {file_extension}')
        except Exception as e:
            logger.error(f"Error in extract_text: {str(e)}")
            raise

    def _process_pdf(self, filepath):
        try:
            poppler_path = self._find_poppler_path()
            if not poppler_path:
                raise RuntimeError("Could not find poppler installation")
                
            logger.info(f"Using poppler path: {poppler_path}")
            
            images = convert_from_path(
                filepath,
                poppler_path=poppler_path,
                dpi=300,
                fmt='ppm',
                thread_count=os.cpu_count() or 1
            )
            
            text_parts = []
            for i, image in enumerate(images, 1):
                logger.info(f"Processing page {i} of PDF")
                text = pytesseract.image_to_string(image)
                if text.strip():
                    text_parts.append(text)
            
            return ' '.join(text_parts)
            
        except Exception as e:
            logger.error(f"Error processing PDF: {str(e)}")
            raise

    def _process_image(self, filepath):
        try:
            image = Image.open(filepath)
            if image.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', image.size, (255, 255, 255))
                background.paste(image, mask=image.split()[-1])
                image = background
            return pytesseract.image_to_string(image)
        except Exception as e:
            logger.error(f"Error processing image: {str(e)}")
            raise