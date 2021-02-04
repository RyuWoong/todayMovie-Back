const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models');
const qr = require('./querys');
const uuid = require('./utils/uuid');
const setToken = require('./utils/setToken');
const { request } = require('express');

dotenv.config();

const MovieURL = process.env.MovieURL;
const apiKey = process.env.TMDB_KEY;

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
    optionsSuccessStatus: 201,
    credentials: true,
  }),
);

app.get('/searchmovie', (req, res) => {
  console.log(req.query);
  axios({
    method: 'GET',
    baseURL: MovieURL,
    url: '/search/movie',
    params: {
      api_key: apiKey,
      language: 'ko',
      region: 'ko',
      query: req.query.movieNm,
    },
  })
    .then((result) => {
      console.log('영화검색 성공', result.data);
      res.status(200).json(result.data.results);
    })
    .catch((result) => {
      console.log('영화검색 실패', result.data);
      res.status(500).send(false);
    });
});

app.get('/movie', (req, res) => {
  const movieID = req.query.movieID;
  const url = `/movie/${movieID}`;
  axios({
    method: 'GET',
    baseURL: MovieURL,
    url: url,
    params: {
      api_key: apiKey,
      language: 'ko',
      region: 'ko',
    },
  })
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((result) => {
      res.status(500).json('Failed Get Movie Info');
    });
});

app.get('/review', (req, res) => {
  console.log(req.query);
  const movieID = req.query.movieID;
  if (movieID == null) {
    res.status(500).send('Miss MovieID');
  } else {
    const reviews = qr.getReview(movieID);
    reviews.then((result) => {
      res.status(201).json({ result: 'OK', data: result });
    });
  }
});

app.get('/myreview', (req, res) => {
  console.log(req.cookies);
  console.log(req.query);
  const userID = 2;
  const movieID = req.query.movieID;
  const myReview = qr.getMyReview(userID, movieID);
  myReview.then((result) => {
    res.status(201).json({ result: 'OK', data: result });
  });
});

app.post('/login', (req, res) => {
  const tid = req.cookies.tid;
  const email = req.body.email;
  const loginID = uuid();
  db.users.update(
    { browserid: tid, loginid: loginID, loginAt: new Date() },
    { where: { email: email } },
  );
  res.send(loginID);
});

app.get('/confirm', (req, res) => {
  const loginID = req.query.token;
  console.log(loginID);
  const user = qr.getUser(loginID);
  const secretKey = process.env.secretkey;
  user
    .then((result) => setToken(result, secretKey))
    .then((token) => {
      console.log('Success! send Token!');
      res.cookie('token', token);
      res.status(201).json({
        result: 'OK',
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Confrim Info Expire');
    });
});

app.post('/register', (req, res) => {
  console.log(req.body);
  db.users.create({
    uuid: uuid(),
    email: req.body.email,
    name: req.body.name,
    createAt: new Date(),
  });
  res.send(req.body);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중!');
});
