const db = require('../models');

const sendErr = () => {
    res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong. Please try again'}],
    });
};

//Index
const index = (req, res) => {
    db.User.find({}, (err, allUsers) => {
        if (err) return sendErr();
        res.json({
            status: 200,
            data: allUsers,
            requestedAt: new Date().toLocaleString(),
        });
    });
}

//Find Route
const find = (req, res) => {
    db.User.findOne({ userId: req.params._id }, (err, foundUser) => {
        if (err) return sendErr();

        res.json({
            status: 200,
            data: foundUser,
            requestedAt: new Date().toLocaleString(),
        });
    });
}

//Create Route
const create = (req, res) => {
    db.User.create(req.body, (err, createdUser) => {
        if (err) return sendErr();

        res.json({
            status: 201,
            data: createdUser,
            requestedAt: new Date().toLocaleString(),
        });
    });
};


module.exports = {
    index,
    find,
    create,
}