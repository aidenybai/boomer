import dotenv from 'dotenv';
import express from 'express';
import boom from 'express-boom';
import cors from 'cors';
import session from 'express-session';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import dirname from 'es-dirname';
import { Database } from 'sqlite3';
import { join } from 'path';

import baseRoutes from './routes/base.mjs';

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', join(dirname(), './../views'));



app.use(boom());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(session({ secret: process.env.SECRET }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

passport.use(strategy);

app.use('/', baseRoutes);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
