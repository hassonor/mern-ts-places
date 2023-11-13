import React, { FC, useRef } from "react";
import { TPlace } from "../../types/types";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal, { ModalHandles } from "../../shared/components/UIElements/Modal";

interface PlaceItemProps {
    place: TPlace;
}

const PlaceItem: FC<PlaceItemProps> = ({place}) => {
    const modalRef = useRef<ModalHandles>(null);

    const openMapHandler = () => {
        modalRef.current?.open();
    };

    const closeMapHandler = () => {
        modalRef.current?.close();
    };

    return (
        <>
            <Modal
                ref={modalRef}
                title={<h2 className="font-extrabold text-lg">{place.address}</h2>}
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="h-60 w-full">
                    <h2 className="font-extrabold text-lg">THE MAP!</h2>
                </div>
            </Modal>
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
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/places/${place.id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
