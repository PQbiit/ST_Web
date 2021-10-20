const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const controller = require('./controller');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')));
app.use('/glider',express.static(path.join(__dirname,'../node_modules/@glidejs/glide/dist/css/glide.core.min.css')));
app.use('/glider.js', express.static(path.join(__dirname,'../node_modules/@glidejs/glide/dist/glide.min.js')));

const port = process.env.PORT || 4040;

app.get('/',controller.home);
app.get('/series',controller.series);
app.get('/login',controller.loginRegister);
app.get('/user/dashboard',controller.userDashboard);
app.post('/login',controller.login);
app.post('/register',controller.register);
app.get('/data/dashboard',controller.fetchProfileData)

app.listen(port,() => console.log(`Server is listening on port 4040`));