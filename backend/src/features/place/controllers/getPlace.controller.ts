import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { NotFoundError } from '@global/helpers/error-handler';
import { placeService } from '@service/db/place.service';


export const DUMMY_PLACES = [{
    id: 'p1', title: 'My first place',
    description: 'This is my first place',
    imageUrl: 'https://triptins.com/wp-content/uploads/2020/10/Views-of-Mount-Everest.jpeg',
    creator: 'u1',
    address: 'QPV8+C97, Lukla - Everest Base Camp Trekking Route, Namche 56000, Nepal',
    location: {
        lat: 32.0700352,
        lng: 34.7916835
    }
},
    {
        id: 'p2',
        title: 'My second place',
        description: 'This is my second place',
        imageUrl: 'https://img.asmedia.epimg.net/resizer/PuXh197rDlHCJNZEUSLIQ5Bx5aU=/1472x1104/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/MGLDLRBRJVHNFJXBK5V3ATY2OM.jpg',
        creator: 'u1',
        address: 'QPV8+C97, Lukla - Everest Base Camp Trekking Route, Namche 56000, Nepal',
        location: {
            lat: 32.0700352,
            lng: 34.7916835
        }
    }];

export class Get {
    public async places(req: Request, res: Response): Promise<void> {

        res.status(HTTP_STATUS.OK).json({message: 'Places list', places: DUMMY_PLACES});
    }

    public async placeById(req: Request, res: Response): Promise<void> {
        const placeId = req.params.placeId;

        const place = await placeService.getPlaceById(placeId);

        if (!place) {
            throw new NotFoundError('Could not find a place for the provided id.');
        }

        res.status(HTTP_STATUS.OK).json({message: 'Place found', place: place.toObject({getters: true})});
    }

    public async placesByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;

        let places = await placeService.placesByUserId(userId);

        if (!places || places.length === 0) {
            throw new NotFoundError('Could not find places for the user id.');
        }

        places = places.map(place => place.toObject({getters: true}));

        res.status(HTTP_STATUS.OK).json({message: 'Places found', places: places});
    }
}