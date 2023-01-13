import {Router} from 'express';
const router = Router();
import * as authController from '../controllers/auth.controller.js'

import {authJwt} from '../middlewares/index.js'

router.post('/signin', authController.signIn);
router.post('/signup', /*verifySignup.checkRolesExisted,*/ /*verifySignup.checkDuplicateUsernameOrEmail, */authController.signup);
router.post('/refresh',authController.refreshToken);
router.get('/verify', authJwt.verifyTokenReturnUser);
router.get('/logout',authController.logOut)

export default router;