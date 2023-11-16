import axios from 'axios';

export const mockedAxios = axios as jest.Mocked<typeof axios>;

export const placeQueueMock = {
    addPlaceJob: jest.fn()
};

export const getCoordsForAddress = jest.fn().mockImplementation((address: string) => {
    return Promise.resolve({
        lat: 37.09024,
        lng: -95.712891
    });
});

export const placeServiceMocks = {
    getAllPlaces: jest.fn(),
    getPlaceById: jest.fn(),
    placesByUserId: jest.fn(),
    createPlace: jest.fn(),
    updatePlace: jest.fn(),
    deletePlace: jest.fn()
};
