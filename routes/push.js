import express from 'express';
import {tokenAuth} from '../middleware/tokenAuth.js';
import Guest from '../models/guestModel.js';

const router = express.Router();

export default router;