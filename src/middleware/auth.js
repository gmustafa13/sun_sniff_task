const jwt = require('jwt')
module.exports =(req,res,next)=> {
const {token} = req.headers.token;
if(token){
 let data = await jwt.verify(token,process.env.JWT_SECRET);
//  data.email
}else{
    throw new Error("Un autharized")
}
}