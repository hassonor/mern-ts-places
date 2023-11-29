import { FC, FormEvent, ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";
import { createNewPlace } from "../../shared/utils/http-requests";
import { TNewPlaceData } from "../../types/types";

const NewPlace: FC = (): ReactElement => {
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {mutate: createPlace, isPending, isError} = useMutation({
        mutationFn: (placeData: TNewPlaceData) => createNewPlace(placeData, token),
        onSuccess: () => {
            navigate('/');
        },
        onError: (error: any) => {

            setErrorMessage(error?.response?.data?.message || error?.message || "Something went wrong");
        }
    });

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false);

    const placeSubmitHandler = (event: FormEvent) => {
        event.preventDefault();

        const placeData = {
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            image: formState.inputs.image.value
        };

        createPlace(placeData);
    };

    return (
        <>
            {isError && errorMessage && <ErrorModal error={errorMessage} onClear={() => setErrorMessage(null)}/>}
            <form className="list-none m-auto p-4 w-11/12 max-w-xl shadow-md rounded-md bg-white"
                  onSubmit={placeSubmitHandler}>
                {isPending && <LoadingSpinner asOverlay/>}
                <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]}
                       errorText="Please enter a valid title."
                       onInput={inputHandler}/>
                <Input id="description" element="textarea" label="Description"
                       validators={[VALIDATOR_MINLENGTH(7)]}
                       errorText="Please enter a valid description. (at least 7 characters)"
                       onInput={inputHandler}/>
                <Input id="address" element="input" type="text" label="Address"
                       validators={[VALIDATOR_REQUIRE()]}
                       errorText="Please enter a valid address."
                       onInput={inputHandler}/>
                <ImageUpload id="image" onInput={inputHandler}/>
                <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
            </form>
        </>
    );
};

export default NewPlace;
