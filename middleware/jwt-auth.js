const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    verifyToken : async function (req, res, next) {
        const token = req.header("access-token");
        if(token == null){
            res.status(401).json({
                status: 401,
                message:"Unauthorized!",
                details:"token empty!"
            })
        }else{
            try{
                const verifyToken = await jwt.verify(token, process.env.SECRET_JWT);
                next();
            }catch(e){
                res.status(200).json({
                    message:"Unauthorized!",
                    details:e
                });
            }
        }
    }
}