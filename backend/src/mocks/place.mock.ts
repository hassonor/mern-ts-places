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

import { AuthPayload } from '@auth/interfaces/auth.interface';


export interface IPlaceMock {
    title?: string;
    description?: string;
    address?: string;
    image?: string;
    creator?: string;
    // other fields as needed
}


export const placeMockRequest = (body: any, currentUser?: AuthPayload | null, params?: any) => ({
    body,
    params,
    currentUser
});

export const placeServiceMocks = {
    getAllPlaces: jest.fn(),
    getPlaceById: jest.fn(),
    placesByUserId: jest.fn(),
    createPlace: jest.fn(),
    updatePlace: jest.fn(),
    deletePlace: jest.fn()
};
