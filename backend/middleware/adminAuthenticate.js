require('dotenv').config();

const admin = require('firebase-admin');

function adminAuthenticate(req, res, next) {
    if (req.headers.uid !== process.env.ADMIN)
    {
        return res.status(401).send('Unauthorized Header. Access Denied');
    }
    next();
 
//end function 
}

module.exports = adminAuthenticate