const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
}

const auth = admin.auth();
const firestore = admin.firestore();

module.exports = { auth, firestore };