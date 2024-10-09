const jwt=require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req,res,next){
const authHeader=req.headers["authorization"];
const token=authHeader && authHeader.split(' ')[1]


//if no token then its unauthorized
if(!token){res.sendStatus(401)};

jwt.verify(token,process.env.ACESS_TOKEN_SECRET,(err,user)=>{
    //if token is invalide forbid the user
    if(err) return res.sendStatus(401);
    req.user=user;
    next();
})
}
module.exports={
    authenticateToken
}