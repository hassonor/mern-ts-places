import { FC } from "react";
import { TPlace } from "../../types/types.ts";
import PlaceList from "../components/PlaceList.tsx";
import { useParams } from "react-router-dom";

export const DUMMY_PLACES: TPlace[] = [{
    id: 'p1', title: 'My first place',
    description: 'This is my first place',
    imageUrl: 'https://triptins.com/wp-content/uploads/2020/10/Views-of-Mount-Everest.jpeg',
    creator: 'u2',
    address: 'QPV8+C97, Lukla - Everest Base Camp Trekking Route, Namche 56000, Nepal',
    location: {
        lat: 32.0700352,
        lng: 34.7916835
    }
},
    {
        id: 'p2',
        title: 'My second place',
        description: 'This is my second place',
        imageUrl: 'https://img.asmedia.epimg.net/resizer/PuXh197rDlHCJNZEUSLIQ5Bx5aU=/1472x1104/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/MGLDLRBRJVHNFJXBK5V3ATY2OM.jpg',
        creator: 'u1',
        address: 'QPV8+C97, Lukla - Everest Base Camp Trekking Route, Namche 56000, Nepal',
        location: {
            lat: 32.0700352,
            lng: 34.7916835
        }
    }];

const UserPlaces: FC = () => {
    const userId: string = useParams().userId;

    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return (
        <PlaceList items={loadedPlaces}/>
    )
}

export default UserPlaces