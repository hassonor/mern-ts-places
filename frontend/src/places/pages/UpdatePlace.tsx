import { FC, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input.tsx";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import Button from "../../shared/components/FormElements/Button.tsx";
import { useForm } from "../../shared/hooks/form-hook.ts";
import Card from "../../shared/components/UIElements/Card.tsx";
import { TPlace, TPlaceByIdResponse } from "../../types/types.ts";
import useHttpClient from "../../shared/hooks/http-hook.ts";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.tsx";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.tsx";
import { AuthContext } from "../../shared/context/auth-context.ts";


const UpdatePlace: FC = () => {
    const authCtx = useContext(AuthContext);
    const placeId = useParams().placeId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState<Partial<TPlace>>();
    const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`${import.meta.env.VITE_APP_BASE_BE_URL}/places/${placeId}`) as unknown as TPlaceByIdResponse
                setLoadedPlace(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true)

            } catch (err) {
                // Error handling is managed by useHttpClient
            }
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);


    const addPlaceSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        try {
            const updatedPlaceData = {
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }


            sendRequest(`${import.meta.env.VITE_APP_BASE_BE_URL}/places/${placeId}`, 'PATCH', updatedPlaceData, {Authorization: `Bearer ${authCtx.token}`})
                .then(() => {
                    navigate(`/${authCtx.userId}/places`);
                })
                .catch(() => {

                });


        } catch (err) { /* empty */
        }
    }


    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner/>
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }


    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {!isLoading && loadedPlace && (
                <form className="list-none m-auto p-4 w-11/12 max-w-xl shadow-md rounded-md bg-white"
                      onSubmit={addPlaceSubmitHandler}
                >
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        type="text"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(7)]}
                        errorText="Please enter a valid description. (at least 7 characters)"
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
                    <Button to='..' relative='path' inverse>BACK</Button>
                </form>)}
        </>)
}

export default UpdatePlace;