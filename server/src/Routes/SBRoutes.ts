import { Router } from 'express';
import { scrapUrl } from '../Controllers/SBControllers';

const SBRouter = Router();

SBRouter.route('/scrap').post(scrapUrl);
SBRouter.route('/screenshot').post(scrapUrl);
export default SBRouter;
