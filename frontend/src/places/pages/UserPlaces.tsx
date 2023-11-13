import { FC } from "react";
import { TPlace } from "../../types/types.ts";
import PlaceList from "../components/PlaceList.tsx";

const DUMMY_PLACES: TPlace[] = [{
    id: 'p1', title: 'My first place',
    description: 'This is my first place',
    imageUrl: 'https://triptins.com/wp-content/uploads/2020/10/Views-of-Mount-Everest.jpeg',
    creator: 'Or Hasson',
    address: 'QPV8+C97, Lukla - Everest Base Camp Trekking Route, Namche 56000, Nepal',
    location: {
        lat: 27.7935331,
        lng: 86.7159345
    }
},
    {
        id: 'p2',
        title: 'My second place',
        description: 'This is my second place',
        imageUrl: 'https://triptins.com/wp-content/uploads/2020/10/Views-of-Mount-Everest.jpeg',
        creator: 'Or Hasson',
        address: 'QPV8+C97, Lukla - Everest Base Camp Trekking Route, Namche 56000, Nepal',
        location: {
            lat: 27.7935331,
            lng: 86.7159345
        }
    }];

const UserPlaces: FC = () => {
    return (
        <PlaceList items={DUMMY_PLACES}/>
    )
}

export default UserPlaces