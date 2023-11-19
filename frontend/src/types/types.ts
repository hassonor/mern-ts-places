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

export type TUserPlacesResponse = {
    message: string;
    places: TPlace[];
}

export type TPlaceByIdResponse = {
    message: string;
    place: TPlace;
}
