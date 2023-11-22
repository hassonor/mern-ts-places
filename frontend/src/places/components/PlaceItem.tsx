import { FC, useContext, useRef } from "react";
import { TPlace } from "../../types/types";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal, { ModalHandles } from "../../shared/components/UIElements/Modal";
import GoogleMap from "../../shared/components/UIElements/GoogleMap.tsx";
import { AuthContext } from "../../shared/context/auth-context.ts";
import useHttpClient from "../../shared/hooks/http-hook.ts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.tsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.tsx";

interface PlaceItemProps {
    place: TPlace;
    onDelete: (deletedPlaceId: string) => void
}

const PlaceItem: FC<PlaceItemProps> = ({place, onDelete}) => {
    const {token} = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
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

    const confirmDeletePlaceHandler = async () => {
        deleteModalRef.current?.close();
        try {
            await sendRequest(`http://localhost:5000/api/v1/places/${place._id}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
            onDelete(place._id);
            deleteModalRef.current?.close();
        } catch (error) {
            console.error("Error deleting place:", error);
        }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                ref={mapModalRef}
                title={<h2 className="font-extrabold text-lg">{place.address}</h2>}
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
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
            <li className="flex justify-center my-4">
                <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-0">
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className="w-full h-32 mr-6 lg:h-80">
                        <img src={place.image} alt={place.title} className="w-full h-full object-cover"/>
                    </div>
                    <div className="p-4 text-center">
                        <h2 className="mb-2 font-extrabold text-sm lg:text-base">{place.title}</h2>
                        <h3 className="mb-2 font-extrabold text-sm lg:text-base">{place.address}</h3>
                        <p className="mb-2 text-xs lg:text-sm">{place.description}</p>
                    </div>
                    <div
                        className="pt-4 text-center border-t border-gray-300 pb-4 mx-2 space-y-2 sm:space-y-0 sm:flex sm:justify-center">
                        <Button inverse onClick={openMapHandler}>VIEW ON
                            MAP</Button>
                        {authCtx.isLoggedIn && authCtx.userId === place.creator && (
                            <>
                                <Button to={`/places/${place._id}`}>EDIT</Button>
                                <Button danger
                                        onClick={openConfirmDeleteHandler}>DELETE</Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
