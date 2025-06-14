import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client();

export const verifyGoogleOIDC = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid auth token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OIDC_AUDIENCE,

        });

        const payload = ticket.getPayload();
        if (payload.email !== process.env.GCP_CRON_SERVICE_ACCOUNT) {
            return res.status(403).json({ error: 'Unauthorized service account' });
        }
        req.googleIdentity = payload;
        next();
    } catch (error) {
        console.error('OIDC verification failed:', error.message);
        return res.status(401).json({ error: 'Invalid OIDC token' });
    }
}