import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import dirname from 'es-dirname';
import express from 'express';
import boom from 'express-boom';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import auth from './auth.mjs';
import baseRoutes from './routes/base.mjs';

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

passport.use(auth.strategy);
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(dirname(), './../views'));

app.use(boom());
app.use(cors());
app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', baseRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`http://localhost:${process.env.PORT}`);
});
