import express from 'express';
import { analyzeAndSendReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/analyze', analyzeAndSendReviews);

export default router;
