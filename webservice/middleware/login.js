const user = require("../model/user");
module.exports = async(req, res, next) => {
    req.user = {status:false};

    if(req.body.login === "login"){
        req.user = await user.loginUserWithPass(req.body.email, req.body.password);
        if (req.user.status) {
            res.cookie('email', req.user.user.email, { maxAge: 1000 * 60 * 60 * 24 });
            res.cookie('ph', req.user.cookieHash, { maxAge: 1000 * 60 * 60 * 24 });
        }

    }else if(req.cookies !== undefined && req.cookies.ph !== undefined ){
        req.user = await user.loginUserWithCookie(req.cookies.email, req.cookies.ph);
    }





    next();
};