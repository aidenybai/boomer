import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { Strategy } from 'passport-local';
import User from './models/User.mjs';

export const strategy = new Strategy((username, password, done) => {
  User.findOne({ username }, async (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) return done(null, false);
    return done(null, user);
  });
});

export const serializeUser = (user, done) => {
  done(null, user.id);
};

export const deserializeUser = (id, done) => {
  User.findOne({ id }, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
};

export const createUser = async (username, password) => {
  const hash = await bcrypt.hash(password, 10);
  User.findOne({ username }, (_err, user) => {
    if (!user) {
      User.create({ username, password: hash, id: nanoid() });
    }
  });
};

export default { strategy, serializeUser, deserializeUser, createUser };
