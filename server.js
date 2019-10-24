//-------------------------SETUP------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
//internal modules
const db = require('./models');
const routes = require('./routes');
//instanced module
const app = express();

//------------------------MIDDLEWARE---------------------------

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: 'ohshitthisisasecret',
    resave: false, 
    saveUninitialized: false, 
  }));

//------------------------CONFIGURATION VARIABLES--------------

const PORT = process.env.PORT || 3000;

//------------------------ROUTES-------------------------------

//SECTION View Routes

app.use('/', routes.views);

app.get('/api/v1', (req, res) => {
    res.json({
        status: 200,
        message: 'IME Api',
        endpoints: [
            {
                method: 'GET',
                path: '/api/v1',
                description: 'Describes all available endpoints.'
            }
        ]
    })
})

//SECTION User Routes
app.use('/api/v1/users', routes.user);

//SECTION Meme Routes
app.use('/api/v1/memes', routes.meme);

//SECTION Auth Routes
app.use('/api/v1', routes.api);

//Delete Route ============FOR DEBUGGING ONLY================

// const removeAllMemes = () => {
//     db.Meme.remove({}, (err, removedMemes) => {
//         if(err){ 
//             console.log(err);
//         } else {
//             console.log('success', removedMemes);
//         }
//     })
// }

// removeAllMemes();

// const removeAllUsers = () => {
//     db.User.remove({}, (err, removedUsers) => {
//         if(err){ 
//             console.log(err);
//         } else {
//             console.log('success', removedUsers);
//         }
//     })
// }

// removeAllUsers();

//------------------------START SERVER-------------------------

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}/`));