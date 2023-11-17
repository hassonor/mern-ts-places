import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { placeService } from '@service/db/place.service';
import { placeQueue } from '@service/queues/place.queue';
import { Delete } from '@place/controllers/deletePlace.controller';

jest.mock('@service/db/place.service');

// Mock the entire PlaceQueue class
jest.mock('@service/queues/place.queue', () => ({
    placeQueue: {
        addPlaceJob: jest.fn(),
    }
}));

describe('Delete Place Controller Tests', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockGetPlaceById: jest.Mock;
    let mockAddPlaceJob: jest.Mock;

    beforeEach(() => {
        req = {params: {placeId: '123'}};
        res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        mockGetPlaceById = placeService.getPlaceById as jest.Mock;
        mockGetPlaceById.mockReset();

        mockAddPlaceJob = placeQueue.addPlaceJob as jest.Mock;
        mockAddPlaceJob.mockReset();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a place and return no content response', async () => {
        mockGetPlaceById.mockResolvedValue(true);
        const controller = new Delete();

        await controller.place(req as Request, res as Response);

        expect(mockGetPlaceById).toHaveBeenCalledWith('123');
        expect(mockAddPlaceJob).toHaveBeenCalledWith('deletePlaceInDB', {placeId: '123'});
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NO_CONTENT);
    });

    it('should throw an error if the place does not exist', async () => {
        mockGetPlaceById.mockResolvedValue(null);
        const controller = new Delete();

        await expect(controller.place(req as Request, res as Response)).rejects.toThrow('Place not found, could not be deleted.');

        expect(mockGetPlaceById).toHaveBeenCalledWith('123');
        expect(mockAddPlaceJob).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(HTTP_STATUS.NO_CONTENT);
    });

});
