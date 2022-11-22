require('dotenv').config();

const admin = require('firebase-admin');
const User = require('../models/user');

async function adminAuthenticate(req, res, next) {
    const user = await User.find({_id: req.headers.uid});
    if (!user.isAdmin)
    {
        return res.status(401).send('Unauthorized Header. Access Denied');
    }
    next();
 
//end function 
}

module.exports = adminAuthenticate