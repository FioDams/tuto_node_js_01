import { Router } from 'express';
import { createThing, getOneThing, getAllStuff, modifyThing, deleteThing } from '../controllers/stuff.js';
import auth from '../middlewares/auth.js';
import multer from '../middlewares/multer-config.js';

const router = Router();

router.get('/', auth, getAllStuff);
router.post('/', auth, multer, createThing);
router.get('/:id', auth, getOneThing);
router.put('/:id', auth, multer, modifyThing);
router.delete('/:id', auth, deleteThing);

export default router;