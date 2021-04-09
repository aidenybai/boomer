import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.render('index');
});

router.use((_req, res) => {
  res.boom.notFound();
});

export default router;
