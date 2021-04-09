import { Router } from 'express';
import passport from 'passport';
import auth from '../auth.mjs';

const router = Router();

router.get('/', (_req, res) => {
  res.render('index');
});

router.get('/signup', (req, res) => {
  res.render('signup', { fail: req.query.fail });
});

router.post('/signup', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.redirect('/signup?fail=true');
  }

  await auth.createUser(req.body.username, req.body.password);
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', { fail: req.query.fail });
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login?fail=true' }),
  (_req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use((_req, res) => {
  res.render('404');
});

export default router;
