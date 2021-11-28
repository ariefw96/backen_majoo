const userModel = require('../../model/user_model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login_user = async function(req, res){
    const {username, password } = req.body;
    try{
        const userData = await userModel.findOne({
            where : {
                username : username,
                password : password
            }
        });
        if(userData == null){
            throw 'Login failed';
        }
        const token = jwt.sign({username : userData.username }, process.env.SECRET_JWT,{expiresIn: '1d'});
        res.status(200).json({
            status: 200,
            message: 'sukses login.',
            username : userData.username,
            token : token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            status: 500,
            message: e.toString()
        })
    }
}