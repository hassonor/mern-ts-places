import { FC } from "react";
import { TPlace } from "../../types/types.ts";
import Card from "../../shared/components/UIElements/Card.tsx";
import Button from "../../shared/components/FormElements/Button.tsx";

interface PlaceItemProps {
    place: TPlace;
}


const PlaceItem = ({place}) => {
    return (
        <li className="my-4">
            <Card className="p-0">
                <div className="w-full h-32 mr-6 lg:h-80">
                    <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover"/>
                </div>
                <div className="p-4 text-center">
                    <h2 className="mb-2 font-extrabold">{place.title}</h2>
                    <h3 className="mb-2 font-extrabold">{place.address}</h3>
                    <p className="mb-2">{place.description}</p>
                </div>
                <div className="pt-4 text-center border-t border-gray-300 pb-4">
                    <Button inverse>VIEW
                        ON MAP
                    </Button>
                    <Button to={`/places/${place.id}`}>EDIT
                    </Button>
                    <Button danger>DELETE
                    </Button>
                </div>
            </Card>
        </li>
    );
};


export default PlaceItem