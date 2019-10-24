const bcrypt = require('bcryptjs');
const db = require('../models');

const sendErr = () => {
    res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong. Please try again'}],
    });
};

// POST to create users
const createUser = (req, res) => {
    db.User.findOne({ email: req.body.email}, (error, foundUser) => {
        if (error) return sendErr();
        if (foundUser) return res.status(400).json({
                status: 400,
                error: [{message: `Invalid request. Please try again`}]
        });

    bcrypt.genSalt(10, (error, salt) => {
        if (error) return sendErr();
        bcrypt.hash(req.body.password, salt, (error, hash) => {
            if (error) return sendErr();

            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hash,
            };

            db.User.create(newUser, (error, createdUser) => {
                if (error) return sendErr();

                res.status(201).json({
                    status: 201,
                });
            });
        });
    });
    });
};


// Create session
// NOTE Need to create short function for incorrect username/pass
const createSession = (req, res) => {
    db.User.findOne({ email: req.body.email}, (error, foundUser) => {
        if (error) return sendErr();

        if (!foundUser) return res.status(400).json({
            status: 400,
            error: [{message: `Username or password is incorrect`}]
        });

        bcrypt.compare(req.body.password, foundUser.password, (error, isMatch) => {
            if (error) return sendErr();

            if (isMatch) {
                req.session.currentUser = foundUser._id;
                return res.status(201).json({
                    status: 201,
                    data: { id: foundUser._id},
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    error: [{message: `Username or password is incorrect`}]
                });
            }
        });
    });
};


const verifyAuth = (req, res) => {
    if (req.session.currentUser) {
        return res.status(401).json({
            status: 401,
            error: [{message: `Unauthorized user. Please login and try again`}]
        });
    }

    res.status(200).json({
        status: 200,
        user: req.session.currentUser,
    });
}

const showProfile = (req, res) => {
    if (!req.session.currentUser) return sendErr();

    db.User.findById(req.params.userId, (error, foundProfile) => {
        if (error) return sendErr();

        res.status(200).json({
            status: 200,
            data: foundProfile,
        });
    });
}

const destroySession = (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).json({
            status: 500,
            error: [{message: 'Something went wrong. Please try again'}],
        });

        res.status(200).json({
            status: 200,
            message: 'Success',
        });
    });
}

module.exports = {
    createUser,
    createSession,
    verifyAuth,
    showProfile,
    destroySession,
}
