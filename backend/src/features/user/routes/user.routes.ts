import express, { Router } from 'express';
import { SignupController } from '@auth/controllers/signup.controller';
import { SignInController } from '@auth/controllers/signin.controller';
import { PasswordController } from '@auth/controllers/password.controller';
import { Get } from '@user/controllers/getUser.controller';

class UserRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.get('/users', Get.prototype.users);
        return this.router;
    }
}

export const userRoutes: UserRoutes = new UserRoutes();