import {expressjwt} from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_API_CLIENT_ID;
const audience = process.env.AZURE_AUDIENCE;

export const checkJwt = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        
        jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/keys`
    }),
    audience: audience,
    issuer: `https://sts.windows.net/${tenantId}/`,
    algorithms: ['RS256']
});