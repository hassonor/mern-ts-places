import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import * as cloudinaryUploads from '@global/helpers/cloudinary-upload';
import { mockedAxios, placeQueueMock, placeMockRequest } from '@root/mocks/place.mock';
import { Create } from '@place/controllers/createPlace.controller';
import { authUserPayload } from '@root/mocks/auth.mock';
import { AuthPayload } from '@auth/interfaces/auth.interface';

jest.mock('axios');
jest.mock('@service/queues/place.queue', () => ({
    placeQueue: placeQueueMock
}));
jest.mock('@global/helpers/cloudinary-upload');

describe('Create Place Controller Tests', () => {
    let req: { currentUser: AuthPayload | null | undefined; body: any; params: any };
    let res: Partial<Response>;

    beforeEach(() => {
        req = placeMockRequest({
            title: 'Historic Museum',
            description: 'A lovely spot in the heart of the city.',
            address: '123 Main St, Anytown, USA',
            image: 'https://example.com/image4.jpg',
            creator: '6471dc7e3ad83f9e03d9ccf6'
        }, authUserPayload);
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockedAxios.get.mockResolvedValue({
            data: {
                results: [{geometry: {location: {lat: 37.09024, lng: -95.712891}}}],
                status: 'OK'
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a place and return success response', async () => {
        const controller = new Create();
        jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any => Promise.resolve({
            version: '1234737373',
            public_id: '123456'
        }));
        
        await controller.place(req as Request, res as Response);

        expect(mockedAxios.get).toHaveBeenCalled();
        expect(placeQueueMock.addPlaceJob).toHaveBeenCalledWith('addPlaceToDB', expect.any(Object));
        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    });

    it('should throw an error if the address is invalid', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                status: 'ZERO_RESULTS'
            }
        });
        const controller = new Create();

        await expect(controller.place(req as Request, res as Response)).rejects.toThrow('Could not find a place for the provided address.');

        expect(mockedAxios.get).toHaveBeenCalled();
        expect(placeQueueMock.addPlaceJob).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    });

    it('should handle network or server issues gracefully', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network error'));

        const controller = new Create();
        await expect(controller.place(req as Request, res as Response)).rejects.toThrow('Could not find a place for the provided address.');

        expect(mockedAxios.get).toHaveBeenCalled();
        expect(placeQueueMock.addPlaceJob).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    });

    describe('Field Validations', () => {
        const requiredFields = [
            {field: 'title', value: '', error: 'Title is a required field'},
            {field: 'description', value: '', error: 'Description is a required field'},
            {field: 'address', value: '', error: 'Address is a required field'},
            {field: 'image', value: '', error: 'Image is a required field'},
            {field: 'creator', value: '', error: 'Creator is a required field'}
        ];

        test.each(requiredFields)('should validate %s', async ({field, value, error}) => {
            req.body[field] = value;
            const controller = new Create();

            await expect(controller.place(req as Request, res as Response)).rejects.toThrow(error);

            expect(mockedAxios.get).not.toHaveBeenCalled();
            expect(placeQueueMock.addPlaceJob).not.toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalledWith(HTTP_STATUS.CREATED);
        });
    });
});
