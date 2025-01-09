import threading
import spacy
import pandas as pd
import numpy as np
from datetime import date
import matplotlib
# Force matplotlib to use the Agg backend before importing pyplot
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import base64
from io import BytesIO
from collections import Counter
from typing import Dict, List, Any
import logging

# Import Firebase admin SDK
import firebase_admin
from firebase_admin import credentials, firestore

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HealthAnalyzer:
    _instance = None
    _lock = threading.Lock()  # Fix: Added threading import here
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(HealthAnalyzer, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            try:
                self.nlp = spacy.load("en_core_web_sm")
            except OSError as e:
                logger.error("Failed to load spaCy model: %s", str(e))
                raise OSError("Please install the en_core_web_sm model: python -m spacy download en_core_web_sm")
            
            self._initialize_patterns()
            self.initialized = True

            # Initialize Firebase
            self._initialize_firebase()

    def _initialize_firebase(self):
        """Initialize Firebase with the service account key."""
        try:
            cred = credentials.Certificate("path/to/your/serviceAccountKey.json")
            firebase_admin.initialize_app(cred)
            logger.info("Firebase initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing Firebase: {str(e)}")

    def _initialize_patterns(self):
        """Initialize medical entity patterns."""
        self.entity_patterns = {
            'symptoms': ['pain', 'fever', 'cough', 'fatigue'],
            'conditions': ['diabetes', 'hypertension', 'asthma'],
            'medications': ['aspirin', 'ibuprofen', 'paracetamol']
        }

    def analyze_text(self, text: str) -> Dict[str, Any]:
        """Thread-safe analysis of text with proper error handling."""
        try:
            if not isinstance(text, str) or not text.strip():
                logger.warning("Empty or invalid text input received")
                return self._get_empty_result()

            # Extract entities with thread safety
            with self._lock:
                entities = self._extract_entities(text.strip())
                
                if not entities or not any(entities.values()):
                    logger.info("No entities found in text")
                    return self._get_empty_result()

                visualizations = self._generate_visualizations(entities)

            return {
                'entities': entities,
                'visualizations': visualizations,
                'metadata': {
                    'timestamp': str(date.today()),
                    'word_count': len(text.split()),
                    'entity_count': sum(len(v) for v in entities.values())
                }
            }

        except Exception as e:
            logger.error("Error in text analysis: %s", str(e))
            return self._get_empty_result()

    def _get_empty_result(self) -> Dict[str, Any]:
        """Return a properly formatted empty result."""
        return {
            'entities': {},
            'visualizations': {},
            'metadata': {
                'timestamp': str(date.today()),
                'word_count': 0,
                'entity_count': 0
            }
        }

    def _extract_entities(self, text: str) -> Dict[str, List[str]]:
        """Extract medical entities from text with error handling."""
        try:
            doc = self.nlp(text.lower())
            entities = {category: [] for category in self.entity_patterns}
            
            for word in doc:
                for category, patterns in self.entity_patterns.items():
                    if word.text in patterns:
                        entities[category].append(word.text)
            
            return entities
        except Exception as e:
            logger.error("Entity extraction error: %s", str(e))
            return {category: [] for category in self.entity_patterns}

    def _generate_visualizations(self, entities: Dict[str, List[str]]) -> Dict[str, str]:
        """Generate visualizations with proper resource management."""
        visualizations = {}
        
        try:
            # Entity distribution pie chart
            if any(len(v) > 0 for v in entities.values()):
                counts = {k: len(v) for k, v in entities.items() if v}
                
                plt.figure(figsize=(10, 6))
                try:
                    plt.pie(counts.values(), labels=counts.keys(), autopct='%1.1f%%')
                    plt.title('Distribution of Medical Entities')
                    
                    visualizations['entity_distribution'] = self._figure_to_base64()
                finally:
                    plt.close()

                # Entity frequency bar chart
                plt.figure(figsize=(12, 6))
                try:
                    all_entities = [item for sublist in entities.values() for item in sublist]
                    if all_entities:
                        entity_freq = Counter(all_entities)
                        plt.bar(entity_freq.keys(), entity_freq.values())
                        plt.xticks(rotation=45, ha='right')
                        plt.title('Entity Frequency')
                        
                        visualizations['entity_frequency'] = self._figure_to_base64()
                finally:
                    plt.close()

        except Exception as e:
            logger.error("Visualization generation error: %s", str(e))
            
        return visualizations

    def _figure_to_base64(self) -> str:
        """Convert matplotlib figure to base64 string with proper cleanup."""  
        buffer = BytesIO()
        try:
            plt.savefig(buffer, format='png', bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            return image_base64
        finally:
            buffer.close()

        
    def save_to_firebase(self, analysis_result: Dict[str, Any]) -> bool:
        """Save the analysis result to Firebase Firestore."""
        try:
            # Initialize Firestore client
            db = firestore.client()

            # Create a document reference
            doc_ref = db.collection('health_analyses').document()  # Create a new document reference

            # Set the document with the analysis result
            doc_ref.set(analysis_result)  # Use 'set()' instead of 'add()'
            
            # Get the document ID
            logger.info(f"Analysis result saved to Firestore with ID: {doc_ref.id}")
            return True
        except Exception as e:
            logger.error(f"Error saving to Firebase: {str(e)}")
            return False


