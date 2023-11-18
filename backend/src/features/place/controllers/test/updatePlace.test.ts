import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { Update } from '@place/controllers/updatePlace.controller';
import { placeService } from '@service/db/place.service';
import { placeQueue } from '@service/queues/place.queue';
import { authUserPayload } from '@root/mocks/auth.mock';

jest.mock('@service/db/place.service', () => ({
    placeService: {
        getPlaceById: jest.fn()
    }
}));
jest.mock('@service/queues/place.queue', () => ({
    placeQueue: {
        addPlaceJob: jest.fn()
    }
}));

describe('Update Place Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            currentUser: authUserPayload,
            params: {placeId: '123'},
            body: {
                title: 'New Title',
                description: 'New Description'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a place and return the updated place preview', async () => {
        const existingPlace = {
            id: '123',
            title: 'Old Title',
            description: 'Old Description',
            creator: authUserPayload.userId
        };
        jest.mocked(placeService.getPlaceById).mockResolvedValue(existingPlace as any);

        const controller = new Update();
        await controller.place(req as Request, res as Response);

        expect(placeService.getPlaceById).toHaveBeenCalledWith('123');
        expect(placeQueue.addPlaceJob).toHaveBeenCalledWith('updatePlaceInDB', {
            placeId: '123',
            updateData: {title: 'New Title', description: 'New Description'}
        });
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Update placed successfully',
            place: {
                ...existingPlace,
                title: 'New Title',
                description: 'New Description'
            }
        });
    });

    it('should throw an error if the place does not exist', async () => {
        jest.mocked(placeService.getPlaceById).mockResolvedValue(null);

        const controller = new Update();

        await expect(controller.place(req as Request, res as Response)).rejects.toThrow('Place not found, could not update.');

        expect(placeService.getPlaceById).toHaveBeenCalledWith('123');
        expect(placeQueue.addPlaceJob).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(HTTP_STATUS.OK);
    });

    it('should throw an error if not authorized', async () => {
        const existingPlace = {
            _id: '123',
            title: 'Old Title',
            description: 'Old Description',
            creator: 'anotherUserId'
        };
        jest.mocked(placeService.getPlaceById).mockResolvedValue(existingPlace as any);

        const controller = new Update();

        await expect(controller.place(req as Request, res as Response))
            .rejects.toThrow('You are not authorized to update this.');

        expect(placeService.getPlaceById).toHaveBeenCalledWith('123');
        expect(placeQueue.addPlaceJob).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

});
