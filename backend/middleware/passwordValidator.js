const passwordSchema = require ('../models/Password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate (req.body.password)) {
        return res.status (400).json ({ error: 'Password complexity ' + passwordSchema.validate (req.body.password, { list: true }) });
    } else {
        next ();
    }
};