const user = require("../model/user");
module.exports = async(req, res, next) => {
    req.user = {status:false};
    if(req.body.email !== undefined &&
    req.body.password !== undefined){
        req.user = await user.loginUserWithPass(req.body.email, req.body.password);
        if (req.user.status) {
            res.cookie('uid', req.user.user.userID, { maxAge: 1000 * 60 * 60 * 24 });
            res.cookie('ph', req.user.cookieHash, { maxAge: 1000 * 60 * 60 * 24 });
        }

    }else if(req.cookies.uid !== undefined && 
             req.cookies.ph !== undefined ){
        req.user = await user.loginUserWithCookie(req.cookies.uid, req.cookies.ph);
    }


    next();
};