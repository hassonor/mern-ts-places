export type TUser = {
    id: string;
    imageUrl: string;
    name: string;
    placeCount: number;
}

export type TPlace = {
    id: string,
    imageUrl: string,
    title: string,
    description: string,
    address: string,
    creator: string,
    location: {
        lat: number,
        lng: number
    }
}
