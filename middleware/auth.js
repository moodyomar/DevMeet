const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req,res,next){
// Get token from header
const token = req.header('x-auth-token');

// check if there is no token
if(!token){
  return res.status(401).json({msg:"no token, authorization denied"})
}

// verify token
try{
    const decoded = jwt.verify(token,config.get('jwtSecret'));
    req.user = decoded.user;
    next();
} catch(err) {
    console.log(err);
    res.status(401).json({msg:'Token is not valid'});
}

}