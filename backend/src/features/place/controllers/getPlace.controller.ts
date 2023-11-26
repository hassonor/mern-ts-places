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

    public async placesByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            if (!userId) throw new NotFoundError('User ID is required');

            const {page, limit, sortString, filterString} = Helpers.getQueryParamsWithPagination(req, 25);
            const sort: PlaceSort = sortString ? JSON.parse(sortString) : {};
            const filter = filterString ? JSON.parse(filterString) : {};

            const {places, total} = await placeService.getAllPlacesByUserId(userId, page, limit, sort, filter);

            res.status(HTTP_STATUS.OK).json({
                message: 'User places list',
                places,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit)
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(HTTP_STATUS.NOT_FOUND).json({message: error.message});
            } else {
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
            }
        }
    }
}