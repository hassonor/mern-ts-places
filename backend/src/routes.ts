import { Application } from 'express';
import { authRoutes } from '@auth/routes/auth.routes';
import { serverAdapter } from '@service/queues/base.queue';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { currentUserRoutes } from '@auth/routes/current.routes';
import { placesPublicRoutes } from '@place/routes/placesPublic.routes';
import { placesProtectedRoutes } from '@place/routes/placesProtected.routes';


const BASE_PATH = '/api/v1';

export default (app: Application) => {
    const routes = () => {
        app.use('/queues', serverAdapter.getRouter());
        app.use(BASE_PATH, authRoutes.routes());
        app.use(BASE_PATH, placesPublicRoutes.routes());
        app.use(BASE_PATH, authMiddleware.verifyUser, placesProtectedRoutes.routes());
        app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
    };
    routes();
};
