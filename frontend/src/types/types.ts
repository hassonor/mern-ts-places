export type TUser = {
    _id: string;
    profilePicture: string;
    places: any[];
    username: string;
    uId: string;
    email: string;
    createdAt: string;
    authId: string;
}

export type TUsersResponse = {
    message: string;
    users: TUser[];
    total: number;
    currentPage: number;
    totalPages: number;
}

export type TUserResponse = {
    message: string;
    user: TUser;
    token: string;
}


export type TPlace = {
    _id: string,
    image: string,
    title: string,
    description: string,
    address: string,
    creator: string,
    location: {
        lat: number,
        lng: number
    }
}

export type TNewPlaceData = {
    title: string,
    description: string,
    address: string,
    image: string
}


export type TUserPlacesResponse = {
    message: string;
    places: TPlace[];
    total: number;
    currentPage: number;
    totalPages: number;
}

export type TPlaceByIdResponse = {
    message: string;
    place: TPlace;
}

export type TPaginationProps = {
    currentPage: number;
    totalPages: number;
    limit: number;
    onLimitChange: (limit: number) => void;
    onPageChange: (page: number) => void;
};


export type TLimitOptions = 1 | 2 | 10 | 15 | 25 | 50 | 100;

export interface ISearchParams {
    request: {
        url: string;
    };
}