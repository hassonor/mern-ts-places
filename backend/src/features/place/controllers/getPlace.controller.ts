import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { NotFoundError } from '@global/helpers/error-handler';
import { placeService } from '@service/db/place.service';
import { PlaceSort } from '@place/interfaces/place.interface';
import { Helpers } from '@global/helpers/helpers';


export class Get {
    public async places(req: Request, res: Response): Promise<void> {
        const {page, limit, sortString, filterString} = Helpers.getQueryParamsWithPagination(req, 25);

        const sort: PlaceSort = sortString ? JSON.parse(sortString) : {};
        const filter = filterString ? JSON.parse(filterString) : {};

        const {places, total} = await placeService.getAllPlaces(page, limit, sort, filter);

        res.status(HTTP_STATUS.OK).json({
            message: 'Places list',
            places,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    }

    public async placeById(req: Request, res: Response): Promise<void> {
        const placeId = req.params.placeId;

        const place = await placeService.getPlaceById(placeId);

        if (!place) {
            throw new NotFoundError('Could not find a place for the provided id.');
        }

        res.status(HTTP_STATUS.OK).json({message: 'Place found', place: place});
    }

    // TODO: Add server side pagination,sorting and filtering
    public async placesByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;

        const places = await placeService.placesByUserId(userId);

        if (!places || places.length === 0) {
            throw new NotFoundError('Could not find places for the user id.');
        }

        res.status(HTTP_STATUS.OK).json({message: 'User places found', places: places});
    }
}