// Authentication middleware. When used, the
// Access Token must exist and be verified against
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

// the Auth0 JSON Web Key Set

export const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://revature-net.us.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'http://companion.revature.net',
    issuer: `https://revature-net.us.auth0.com/`,
    algorithms: ['RS256'],
  });