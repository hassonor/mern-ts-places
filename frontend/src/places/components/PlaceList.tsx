import { TPlace } from "../../types/types.ts";
import Card from "../../shared/components/UIElements/Card.tsx";
import PlaceItem from "./PlaceItem.tsx";
import Button from "../../shared/components/FormElements/Button.tsx";
import { FC } from "react";

interface PlaceListProps {
    places: TPlace[];
    onDelete: (deletedPlaceId: string) => void
}

const PlaceList: FC<PlaceListProps> = ({places, onDelete}) => {
    if (places.length === 0) {
        return (
            <div className="mx-auto p-1 w-8/10 max-w-xl">
                <Card className="text-center p-4">
                    <h2 className="text-lg font-semibold mb-4">No places found. Maybe create one?</h2>
                    <Button to="places/new">Share Place</Button>
                </Card>
            </div>
        );
    }
    return (
        <ul className="list-none mx-auto p-0 w-9/10 max-w-xl">
            {places.map((place) => (
                <PlaceItem key={place._id} place={place} onDelete={onDelete}/>
            ))}
        </ul>
    );
};

export default PlaceList;