import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15*60*1000,
    max:20,
    message: 'Too many requests from this IP, try again later.',
})

export const generalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: 'Too many requests. Try again shortly.',
});
