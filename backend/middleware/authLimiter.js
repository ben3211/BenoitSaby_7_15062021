const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit ({
    max: 2,
    windowMs: 1 * 60 * 1000, // 1 min
    message:"Too many try, password acces is bloked for 2 minutes"
});

module.exports = authLimiter;