import { FC } from "react";
import { TPlace } from "../../types/types.ts";
import Card from "../../shared/components/UIElements/Card.tsx";
import PlaceItem from "./PlaceItem.tsx";

interface PlaceListProps {
    items: TPlace[];
}

const PlaceList = ({items}) => {
    if (items.length === 0) {
        return (
            <div className="mx-auto p-0 w-9/10 max-w-xl">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        );
    }
    return (
        <ul className="list-none mx-auto p-0 w-9/10 max-w-xl">
            {items.map((place) => (
                <PlaceItem key={place.id} place={place}/>
            ))}
        </ul>
    );
};