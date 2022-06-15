
const { render } = require('ejs');
const { Router } = require('express');
const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./src/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');
// const { authenticate } = require('./src/middleware/auth');
// const { userData } = require('./src/middleware/userData');
const path = require('path')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express();

connectDB()

// const port = 3000;



// app.use(authenticate)
// app.use(userData)
app.use(cookieParser())

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.set('views', path.join(__dirname, '/src/templates/views'));

app.use(express.urlencoded({ extended:true}));

// require("./src/routes/")(app)



// Below is day one stuff

//  middleware  runs on every route
app.use((req, res, next) =>{
    console.log(`Request received ${Date()}.`);
    next();
})


// app.listen(port,  () => {
//     console.log('this is listening on port 3000');
// });

app.listen(process.env.PORT, () => {
    console.log(`Server now running on PORT ${process.env.PORT}`)
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



