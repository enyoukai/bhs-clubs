const ERROR_EXPIRED = 'auth/id-token-expired';

// https://medium.com/@athletecoder/authenticate-routes-with-express-firebase-18faff0edea6
const admin = require('firebase-admin');

function authenticate(req, res, next) {
 
 const header = req.headers.authorization;
 
 //ensure headers are associated with request
 if (!header || !header.startsWith("Bearer ")) {
  console.log(header);
  res.statusMessage = 'Unauthorized Header. Access Denied'
  return res.status(401).send('Unauthorized Header. Access Denied')
 }
 
 //get token from request
 const token = header.substring(7, header.length)
 
 if (!token) {
  console.log('1');
  res.statusMessage = 'Unauthorized Header. Access Denied'
  return res.status(401).send('Unauthorized Header. Access Denied')
 }
//reference => https://firebase.google.com/docs/auth/admin/manage-sessions
 
 admin.auth().verifyIdToken(token)
  .then(function (decodedToken) {
   //attach uid to body for the route to use
   req.headers.uid = decodedToken.uid;
   next();
  })
  .catch(function (error) {
    console.log('2');
   if (error === ERROR_EXPIRED) return res.status(401).send('Expired token');

   res.status(401).send('Unauthorized Header. Access Denied')
  });
 
//end function 
}

module.exports = authenticate