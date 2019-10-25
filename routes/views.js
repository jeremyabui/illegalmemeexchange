const express = require('express');
const router = express.Router();
const path = require('path');

//Middleware

router.use(express.static(path.join(__dirname, '..public')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ('../views/index.html')));
});

//GET Signup
router.get('/signup', (req, res) => {
    res.sendFile('views/auth/signup.html', {
        root: `${__dirname}/../`
    });
});

//GET newMeme
router.get(`/newMeme/:userId`, (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect('/');
    }
    res.sendFile('views/auth/newMeme.html', {
        root: `${__dirname}/../`
    });
});

//GET Profile
router.get('/profile/:userId', (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect('/');
    }
    res.sendFile('views/profile/userPage.html', {
        root: `${__dirname}/../`
    });
});

//GET myMemes
router.get('/myMemes/:userId', (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect('/');
    }
    res.sendFile('views/profile/myMemes.html', {
        root: `${__dirname}/../`
    });
});

module.exports = router;