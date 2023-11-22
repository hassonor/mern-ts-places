import { FC, FormEvent, ReactElement, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input.tsx";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import Button from "../../shared/components/FormElements/Button.tsx";
import { useForm } from "../../shared/hooks/form-hook.ts";
import useHttpClient from "../../shared/hooks/http-hook.ts";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.tsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.tsx";
import ImageUpload from "../../shared/components/FormElements/ImageUpload.tsx";
import { AuthContext } from "../../shared/context/auth-context.ts";


const NewPlace: FC = (): ReactElement => {
    const navigate = useNavigate();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const {token} = useContext(AuthContext);

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

        sendRequest('http://localhost:5000/api/v1/places', 'POST', placeData, {Authorization: `Bearer ${token}`})
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                // Error handling is managed by useHttpClient, but additional actions can be performed here if needed
            });
    }

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError}/>}
            <form className="list-none m-auto p-4 w-11/12 max-w-xl shadow-md rounded-md bg-white"
                  onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]}
                       errorText="Please enter a valid title."
                       onInput={inputHandler}/>
                <Input id="description" element="textarea" type="text" label="Description"
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
    )
}

export default NewPlace;