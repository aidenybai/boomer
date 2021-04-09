import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import auth from '../auth.mjs';

const router = Router();

router.get('/', (_req, res) => {
  res.render('index');
});

router.get('/signup', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
});

router.post(
  '/signup',
  body('username').isLength({ min: 1 }),
  body('password').isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect('/signup');
    }

    await auth.createUser(req.body.username, req.body.password);
    res.redirect('/login');
  }
);

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (_req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use((_req, res) => {
  res.boom.notFound();
});

export default router;
