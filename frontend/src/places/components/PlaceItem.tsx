import { FC } from "react";
import { TPlace } from "../../types/types.ts";
import Card from "../../shared/components/UIElements/Card.tsx";

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
                <div className="pt-4 text-center border-t border-gray-300">
                    <button
                        className="px-4 py-2 m-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg">VIEW
                        ON MAP
                    </button>
                    <button
                        className="px-4 py-2 m-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 shadow-lg">EDIT
                    </button>
                    <button
                        className="px-4 py-2 m-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 shadow-lg">DELETE
                    </button>
                </div>
            </Card>
        </li>
    );
};


export default PlaceItem