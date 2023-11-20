import express, { Router } from 'express';
import { Get } from '@place/controllers/getPlace.controller';


class PlacesPublicRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }


    public routes(): Router {
        this.router.get('/places', Get.prototype.places);
        this.router.get('/places/:placeId', Get.prototype.placeById);
        this.router.get('/places/user/:userId', Get.prototype.placesByUserId);

        return this.router;
    }
}

export const placesPublicRoutes: PlacesPublicRoutes = new PlacesPublicRoutes();

