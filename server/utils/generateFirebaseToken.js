import admin from "firebase-admin";

export const generateFirebaseCustomToken = async (uid, claims = {}) => {
    try {
        const customToken = await admin.auth().createCustomToken(uid, claims);
        return customToken;
    } catch (err) {
        console.error("Error generating Firebase custom token:", err);
        throw err;
    }
};
