const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if jwt exists & if it's valid
    if (token) {

        // uses same string as jwt.sign in authController.js > create_token
        jwt.verify(token, 'A5nlR0BqpqicYMlIkXYZ', (err, decodedToken) => {

            if (err) {
                res.redirect('/login');
            } else {
                next();
            }

        });

    } else {
        res.redirect('/login');
    }

}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    res.locals.user = null;

    // check if jwt exists & if it's valid
    if (token) {

        // uses same string as jwt.sign in authController.js > create_token
        jwt.verify(token, 'A5nlR0BqpqicYMlIkXYZ', async (err, decodedToken) => {

            if (err) {
                next();
            } else {

                const user = await User.findById(decodedToken.id);
                res.locals.user = user;

                next();
                
            }

        });

    } else {
        next();
    }

}

module.exports = { requireAuth, checkUser };