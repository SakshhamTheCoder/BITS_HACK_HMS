const { auth, firestore } = require("../services/firebase");

exports.registerUser = async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const userRecord = await auth.createUser({ email, password, displayName });
    const userData = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || "Anonymous User",
      createdAt: new Date(),
    };

    await firestore.collection("users").doc(userRecord.uid).set(userData);
    res.status(201).json({ message: "User registered successfully", user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const userSnapshot = await firestore.collection("users").where("email", "==", email).get();
    if (userSnapshot.empty) {
      return res.status(404).json({ error: "User not found. Please register first." });
    }

    const user = userSnapshot.docs[0].data();
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error during login." });
  }
};
