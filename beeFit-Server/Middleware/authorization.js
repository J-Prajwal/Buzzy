const UserModel = require('../Models/User.model.js');

const authorization = (permittedRole) => {
    return async (req, res, next) => {
        let email = req.body.email;
        const user = await UserModel.findOne({ email });
        if (!permittedRole.includes(user.role)) {
            res.send('Not authorized')
        }
        else {
            next();
        }
    }
}


module.exports = authorization;