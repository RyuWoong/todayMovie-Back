const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models');
const uuid = require('./utils/uuid');

dotenv.config();

const MovieURL = process.env.MovieURL;

//Start Experess
const app = express();
app.set('port', process.env.PORT);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'todaymovie.net'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  }),
);

app.get('/movie', (req, res) => {
  axios({
    method: 'GET',
    url: MovieURL,
    params: { query: req.query.movieNm, display: 10 },
    headers: { 'X-Naver-Client-Id': process.env.ClientId, 'X-Naver-Client-Secret': process.env.ClientSecret },
  })
    .then((request) => {
      return request.data;
    })
    .then((data) => {
      return data.items;
    })
    .then((items) => {
      console.log('영화 검색 성공');
      res.send(items);
    })
    .catch((request) => {
      console.log('영화검색 실패');
      console.log(request);
      res.send(false);
    });
});

app.post('/login', (req, res) => {
  const getCookie = req.cookies.tid;
  const email = req.body.email;
  const tid = getCookie.split(' ')[0];
  const loginID = uuid();
  db.users.update({ browserid: tid, loginid: loginID, loginAt: new Date() }, { where: { email: email } });
  res.send(loginID);
});

app.get('/confirm', (req, res) => {
  const loginID = req.query.token;
  const user = db.users.findOne({}, { where: loginID });
  console.log(user);
});

app.post('/register', (req, res) => {
  console.log(req.body);
  db.users.create({ uuid: uuid(), email: req.body.email, name: req.body.name, createAt: new Date() });
  res.send(req.body);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중!');
});