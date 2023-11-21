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

        // Mocking placeService methods
        jest.spyOn(placeService, 'getAllPlaces').mockResolvedValue({places: [], total: 0});

        // Mock implementation for getPlaceById
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
            };
            return Promise.resolve(mockPlace as IPlaceDocument);
        });

        jest.spyOn(placeService, 'placesByUserId').mockResolvedValue([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test for getting all places with pagination, sorting, and filtering
    it('should retrieve places with pagination, sorting, and filtering', async () => {
        req.query = {page: '1', limit: '10', sort: '{"title": 1}', filter: '{"title": "Test Place"}'};
        (placeService.getAllPlaces as jest.Mock).mockResolvedValueOnce({
            places: [{_id: 'testId', title: 'Test Place'}],
            total: 1,
        });

        await getController.places(req as Request, res as Response);

        expect(placeService.getAllPlaces).toHaveBeenCalledWith(1, 10, {title: 1}, {title: 'Test Place'});
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Places list',
            places: [{_id: 'testId', title: 'Test Place'}],
            total: 1,
            currentPage: 1,
            totalPages: 1,
        });
    });

    // Test for getting a place by ID
    it('should retrieve a place by its ID', async () => {
        req.params = {placeId: 'testPlaceId'};
        (placeService.getPlaceById as jest.Mock).mockResolvedValueOnce({
            _id: 'testPlaceId',
            title: 'Test Place',
        });

        await getController.placeById(req as Request, res as Response);

        expect(placeService.getPlaceById).toHaveBeenCalledWith('testPlaceId');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Place found',
            place: {_id: 'testPlaceId', title: 'Test Place'},
        });
    });

    // Test for handling not found place by ID
    it('should handle not found place by ID', async () => {
        req.params = {placeId: 'testPlaceId'};
        (placeService.getPlaceById as jest.Mock).mockResolvedValueOnce(null);

        await expect(getController.placeById(req as Request, res as Response)).rejects.toThrow(
            new NotFoundError('Could not find a place for the provided id.')
        );

        expect(placeService.getPlaceById).toHaveBeenCalledWith('testPlaceId');
        expect(res.status).not.toHaveBeenCalledWith(HTTP_STATUS.OK);
    });

    // Test for getting places by user ID
    it('should retrieve places by user ID', async () => {
        req.params = {userId: 'testUserId'};
        (placeService.placesByUserId as jest.Mock).mockResolvedValueOnce([
            {_id: 'testPlaceId', title: 'Test Place'},
        ]);

        await getController.placesByUserId(req as Request, res as Response);

        expect(placeService.placesByUserId).toHaveBeenCalledWith('testUserId');
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User places found',
            places: [{_id: 'testPlaceId', title: 'Test Place'}],
        });
    });
});
