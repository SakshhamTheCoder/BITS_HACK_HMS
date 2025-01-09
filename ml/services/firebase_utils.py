import firebase_admin
from firebase_admin import credentials, firestore
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def initialize_firebase(service_account_path: str):
    """Initialize Firebase app."""
    try:
        cred = credentials.Certificate(service_account_path)
        firebase_admin.initialize_app(cred)
        logger.info("Firebase initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Firebase: {e}")
        raise

def save_to_firestore(collection_name: str, document_data: dict) -> bool:
    """Save data to a Firestore collection."""
    try:
        db = firestore.client()
        doc_ref = db.collection(collection_name).document()
        doc_ref.set(document_data)
        logger.info(f"Data saved to Firestore collection '{collection_name}'")
        return True
    except Exception as e:
        logger.error(f"Error saving to Firestore: {e}")
        return False
