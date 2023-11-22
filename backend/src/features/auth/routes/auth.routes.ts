import express, { Router } from 'express';
import { SignupController } from '@auth/controllers/signup.controller';
import { SignInController } from '@auth/controllers/signin.controller';
import { PasswordController } from '@auth/controllers/password.controller';
import { Get } from '@auth/controllers/getUser.controller';

class AuthRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.get('/users', Get.prototype.users);

        this.router.post('/signup', SignupController.prototype.create);
        this.router.post('/signin', SignInController.prototype.read);
        this.router.post('/forgot-password', PasswordController.prototype.create);
        this.router.post('/reset-password/:token', PasswordController.prototype.update);
        return this.router;
    }
}

export const authRoutes: AuthRoutes = new AuthRoutes();