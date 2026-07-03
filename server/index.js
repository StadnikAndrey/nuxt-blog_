import cookieParser from 'cookie-parser'

import articlesRoutes from './routes/articles.js'
import imgsRoutes from './routes/img.js'
import videoRoutes from './routes/video.js'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'

const port = 3001;

import express from 'express'
const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.disable('etag');

app.get('/api', (req, res) => {
  res.send('Hello! Server Express running!');
})

app.use(articlesRoutes);
app.use(imgsRoutes);
app.use(videoRoutes);
app.use(authRoutes);
app.use(usersRoutes);

app.use(express.static('public'));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})