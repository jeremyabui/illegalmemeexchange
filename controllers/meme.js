const db = require('../models');

const sendErr = (res) => {
    res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong. Please try again'}],
    });
};

//Index
const index = (req, res) => {
    db.Meme.find({}, (err, allMemes) => {
        if (err) return sendErr(res);
        res.json({
            status: 200,
            data: allMemes,
            requestedAt: new Date().toLocaleString(),
        });
    });
};

//Find by ID
const findById = (req, res) => {
    db.Meme.findById(req.params.memeId, (err, foundMeme) => {
        if (err) sendErr(res);

        res.json({
            status: 200,
            data: foundMeme,
            requestedAt: new Date().toLocaleString(),
        });
    });
};

//Create

const create = (req, res) => {
    db.Meme.create(req.body, (err, createdMeme) => {
        if (err) return sendErr(res);

        res.json({
            status: 201,
            data: createdMeme,
            requestedAt: new Date().toLocaleString(),
        });
    });
};

//Destroy

const destroy = (req, res) => {
    db.Meme.findByIdAndDelete(req.params.memeId, (err, deletedMeme)=> {
        if (err) return sendErr(res);

        res.json({
            status: 200,
            data: deletedMeme,
            requestedAt: new Date().toLocaleString(),
        });
    });
};

module.exports = {
    index,
    findById,
    create,
    destroy,
}