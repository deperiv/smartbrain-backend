const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json(database.users[0]);        
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    const newUser = {
        id: (Number(database.users[database.users.length-1].id) + 1).toString(),
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    }

    database.users.push(newUser)
    res.json(database.users[database.users.length-1]); //res.json() is almost equal to res.send()
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    const user = database.users.filter(user => {
        return user.id === id;
    })
    if (user.length !== 0){
        res.json(user[0]);
    } else {
        res.status(404).json('No user found');
    }
    
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    const user = database.users.filter(user => {
        return user.id === id;
    })[0]
    
    if (user.id === id){
        user.entries++;
        res.json(user.entries);
    } else {
        res.status(404).json('No user found');
    }
})

app.listen(3001, () => {
    console.log('App is running successfully')
})
