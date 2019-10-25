const db = require('../models');

const sendErr = (res) => {
    res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong. Please try again'}],
    });
};

//Index
const index = (req, res) => {
    db.User.find({}, (err, allUsers) => {
        if (err) return sendErr(res);
        res.json({
            status: 200,
            data: allUsers,
            requestedAt: new Date().toLocaleString(),
        });
    });
}

//Find Route
const find = (req, res) => {
    db.User.findById(req.params.userId, (err, foundUser) => {
        if (err) return sendErr(res);

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
        if (err) return sendErr(res);

        res.json({
            status: 201,
            data: createdUser,
            requestedAt: new Date().toLocaleString(),
        });
    });
};

//Update Route
const update = (req, res) => {
    db.User.findById(req.params.userId, (err, foundUser) => {
        if (err) console.log (err)

        if (req.body.username) {
            foundUser.username = req.body.username;
        }

        if (req.body.email) {
            foundUser.email = req.body.email;
        }

        if (req.body.memes) {
            req.body.memes.forEach(entry => {
                foundUser.memes.push(entry);
            });
        }

        foundUser.save((err, updatedUser) => {
            if (err) {
                res.json({
                    status: 400,
                    message: 'Uh oh error',
                    err,
                    requestedAt: new Date().toLocaleString(),
                });
            }

            res.json({
                status: 200,
                data: updatedUser,
                requestedAt: new Date().toLocaleString(),
            })
        })
    })
}

//Delete Update Route
const removeUpdate = (req, res) => {
    db.User.findById(req.params.userId, (err, foundUser) => {
        if (err) console.log (err)
        if (req.params.memeId) {
            for(let i=0; i<foundUser.memes.length; i++){
                if(foundUser.memes[i] == req.params.memeId){
                    foundUser.memes.splice(i,1);
                }
            }
        }

        foundUser.save((err, updatedUser) => {
            if (err) {
                res.json({
                    status: 400,
                    message: 'Uh oh error',
                    err,
                    requestedAt: new Date().toLocaleString(),
                });
            }

            res.json({
                status: 200,
                data: updatedUser,
                requestedAt: new Date().toLocaleString(),
            })
        })
    })
}

module.exports = {
    index,
    find,
    create,
    update,
    removeUpdate,
}