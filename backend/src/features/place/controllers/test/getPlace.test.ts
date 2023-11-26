import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { NotFoundError } from '@global/helpers/error-handler';
import { Get } from '@place/controllers/getPlace.controller';
import { IPlaceDocument } from '@place/interfaces/place.interface';
import mongoose from 'mongoose';
import { placeService } from '@service/db/place.service';

jest.mock('@service/db/place.service');

describe('Get Places Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let getController: Get;

    beforeEach(() => {
        req = {query: {}, params: {}};
        res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        getController = new Get();

        jest.spyOn(placeService, 'getAllPlaces').mockResolvedValue({places: [], total: 0});
        jest.spyOn(placeService, 'getPlaceById').mockImplementation(id => {
            const mockPlace: Partial<IPlaceDocument & mongoose.Document> = {
                _id: new mongoose.Types.ObjectId(id),
                title: 'Test Place',
                description: 'Test Description',
                location: {lat: 37.7749, lng: -122.4194},
                image: 'https://test.com/image.jpg',
                address: '123 Test St, Test City, TC',
                creator: new mongoose.Types.ObjectId('123456789012'),
                createdAt: new Date(),
                // Other required properties
            };
            return Promise.resolve(mockPlace as IPlaceDocument);
        });

        jest.spyOn(placeService, 'getAllPlacesByUserId').mockResolvedValue({places: [], total: 0});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve places with pagination, sorting, and filtering', async () => {
        req.query = {page: '1', limit: '10', sort: '{"title": 1}', filter: '{"title": "Test Place"}'};
        const mockPlaces = [{_id: 'testId1', title: 'Test Place 1', /* Other properties */}];
        (placeService.getAllPlaces as jest.Mock).mockResolvedValueOnce({places: mockPlaces, total: mockPlaces.length});

        await getController.places(req as Request, res as Response);

        expect(placeService.getAllPlaces).toHaveBeenCalledWith(1, 10, {title: 1}, {title: 'Test Place'});
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Places list',
            places: mockPlaces,
            total: mockPlaces.length,
            currentPage: 1,
            totalPages: Math.ceil(mockPlaces.length / 10)
        });
    });

    it('should retrieve a place by its ID', async () => {
        req.params = {placeId: 'testPlaceId'};
        (placeService.getPlaceById as jest.Mock).mockResolvedValueOnce({
            _id: 'testPlaceId',
            title: 'Test Place', /* Other properties */
        });

        await getController.placeById(req as Request, res as Response);

        expect(placeService.getPlaceById).toHaveBeenCalledWith('testPlaceId');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Place found',
            place: {_id: 'testPlaceId', title: 'Test Place' /* Other properties */}
        });
    });

    it('should handle not found place by ID', async () => {
        req.params = {placeId: 'nonexistentPlaceId'};
        (placeService.getPlaceById as jest.Mock).mockResolvedValueOnce(null);

        await getController.placeById(req as Request, res as Response).catch((error) => {
            expect(error).toBeInstanceOf(NotFoundError);
            expect(error.message).toEqual('Could not find a place for the provided id.');
        });
    });

    it('should retrieve places by user ID', async () => {
        req.params = {userId: 'testUserId'};
        const mockUserPlaces = [{_id: 'testPlaceId', title: 'User Place', /* Other properties */}];
        (placeService.getAllPlacesByUserId as jest.Mock).mockResolvedValueOnce({
            places: mockUserPlaces,
            total: mockUserPlaces.length
        });

        await getController.placesByUserId(req as Request, res as Response);

        expect(placeService.getAllPlacesByUserId).toHaveBeenCalledWith('testUserId', 1, 25, {}, {});
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User places list',
            places: mockUserPlaces,
            total: mockUserPlaces.length,
            currentPage: 1,
            totalPages: Math.ceil(mockUserPlaces.length / 25)
        });
    });

    it('should handle invalid user ID in placesByUserId', async () => {
        req.params = {}; // Missing userId
        await getController.placesByUserId(req as Request, res as Response).catch((error) => {
            expect(error).toBeInstanceOf(NotFoundError);
            expect(error.message).toEqual('User ID is required');
        });
    });

    it('should handle internal server errors in placesByUserId', async () => {
        jest.spyOn(placeService, 'getAllPlacesByUserId').mockRejectedValueOnce(new Error('Internal Server Error'));
        await getController.placesByUserId(req as Request, res as Response).catch((error) => {
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({message: 'Internal Server Error'});
        });
    });

});
