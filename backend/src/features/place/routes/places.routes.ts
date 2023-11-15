import express, { Router } from 'express';
import { Get } from '@place/controllers/getPlaces.controller';
import { Create } from '@place/controllers/createPlace.controller';
import { Update } from '@place/controllers/updatePlace.controller';
import { Delete } from '@place/controllers/deletePlace.controller';


class PlacesRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }


    public routes(): Router {
        this.router.get('/places', Get.prototype.places);
        this.router.get('/places/:placeId', Get.prototype.placeById);
        this.router.get('/places/user/:userId', Get.prototype.placesByUserId);

        this.router.post('/places', Create.prototype.place);
        this.router.patch('/places/:placeId', Update.prototype.place);
        this.router.delete('/places/:placeId', Delete.prototype.place);

        return this.router;
    }
}

export const placesRoutes: PlacesRoutes = new PlacesRoutes();