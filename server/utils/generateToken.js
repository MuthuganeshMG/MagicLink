const jwt = require('jsonwebtoken');  

// This generates the MAGIC LINK token (short-lived - 1 minute)
const generateMagicLinkToken = (userId) => {
    const token = jwt.sign(
        { 
            userId,
            purpose: 'magic-link' 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1m' } // 1 minute for magic link
    );
    
    return token;
};

// This generates the SESSION token (long-lived - 7 days)
const generateSessionToken = (userId) => {
    const token = jwt.sign(
        { 
            userId,
            type: 'session' 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' } // 7 days for session
    );
    return token;
};

const setSessionCookie = (res, token) => {
    res.cookie('session', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

module.exports = { 
    generateMagicLinkToken, 
    generateSessionToken,
    setSessionCookie 
};