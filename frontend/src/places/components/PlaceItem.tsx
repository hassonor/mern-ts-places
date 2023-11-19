import { FC, useContext, useRef } from "react";
import { TPlace } from "../../types/types";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal, { ModalHandles } from "../../shared/components/UIElements/Modal";
import GoogleMap from "../../shared/components/UIElements/GoogleMap.tsx";
import { AuthContext } from "../../shared/context/auth-context.ts";

interface PlaceItemProps {
    place: TPlace;
}

const PlaceItem: FC<PlaceItemProps> = ({place}) => {
    const mapModalRef = useRef<ModalHandles>(null);
    const deleteModalRef = useRef<ModalHandles>(null);

    const authCtx = useContext(AuthContext);

    const openMapHandler = () => {
        mapModalRef.current?.open();
    };

    const closeMapHandler = () => {
        mapModalRef.current?.close();
    };

    const openConfirmDeleteHandler = () => {
        deleteModalRef.current?.open();
    };

    const cancelDeleteHandler = () => {
        deleteModalRef.current?.close();
    };

    const confirmDeletePlaceHandler = () => {
        deleteModalRef.current?.close();
        console.log("Deleting...");
    };

    return (
        <>
            <Modal
                ref={mapModalRef}
                title={<h2 className="font-extrabold text-lg">{place.address}</h2>}
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
                style={{width: '80%', maxWidth: '600px'}}
            >
                <div className="h-80 w-full">
                    <GoogleMap center={place.location} zoom={16}/>
                </div>
            </Modal>
            <Modal
                ref={deleteModalRef}
                title={<h1 className="font-extrabold text-lg">Are you sure?</h1>}
                footer={
                    <>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeletePlaceHandler}>DELETE</Button>
                    </>
                }
            >
                <p className="font-extrabold text-lg">
                    Do you want to proceed and delete this place? Please note that it can't be undone thereafter.
                </p>
            </Modal>
            <li className="my-4">
                <Card className="p-0">
                    <div className="w-full h-32 mr-6 lg:h-80">
                        <img src={place.image} alt={place.title} className="w-full h-full object-cover"/>
                    </div>
                    <div className="p-4 text-center">
                        <h2 className="mb-2 font-extrabold">{place.title}</h2>
                        <h3 className="mb-2 font-extrabold">{place.address}</h3>
                        <p className="mb-2">{place.description}</p>
                    </div>
                    <div className="pt-4 text-center border-t border-gray-300 pb-4">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {authCtx.isLoggedIn && <Button to={`/places/${place._id}`}>EDIT</Button>}
                        {authCtx.isLoggedIn && <Button danger onClick={openConfirmDeleteHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
