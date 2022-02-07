const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const signIn =require('./controllers/signIn')
const register = require('./controllers/register')
const profile = require('./controllers/profile') 
const image = require('./controllers/image'); 
const { database } = require('pg/lib/defaults');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'perazarivera1998',
      database : 'smart-brain'
    }
});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users)})

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res, db)})

app.listen(3001, () => {
    console.log('App is running successfully')
})
