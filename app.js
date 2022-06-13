
const { render } = require('ejs');
const { Router } = require('express');
const express = require('express');

const app = express();
const port = 3000;

//  middleware  runs on every route
app.use((req, res, next) =>{
    console.log(`Request received ${Date()}.`);
    next();
})

// *****Passing in an object

// const characters = {
//     normal: 'frank reynolds',
//     art: 'ongo',
//     work: 'the warthog'
// }

// app.use('/:actor/frank/:character', (res, ref, next) => {
//     console.log('route specific middleware. ');
//     next();
// })

app.listen(port,  () => {
    console.log('this is listening on port 3000');
});


// set templating engine

app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render('pages/index');
})

app.get('/profile', (req, res) => {
    res.render('pages/profile');
})

app.get('/login', (req, res) => {
    res.render('pages/login'); 
})

app.get('/register', (req, res) => {
    res.render('pages/register');
})


// *** have to remember to add name of user on end of url******

app.get('/user', (req, res) => {
    res.render('pages/user'); 
})



