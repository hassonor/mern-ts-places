import { FC, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces.tsx";
import Input from "../../shared/components/FormElements/Input.tsx";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import Button from "../../shared/components/FormElements/Button.tsx";
import { useForm } from "../../shared/hooks/form-hook.ts";

const UpdatePlace: FC = () => {
    const placeId = useParams().placeId;
    const [isLoading, setIsLoading] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, true);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true)
            setIsLoading(false);
        }
    }, [setFormData, identifiedPlace])

    const addPlaceSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedPlace) {
        return (
            <div className="text-center flex justify-center items-center">
                <h2> Could not find place.</h2>
            </div>
        )
    }

    /*
     * Temporarily, till we will have
     */
    if (isLoading) {
        return (
            <div className="text-center flex justify-center items-center">
                <h2> Loading...</h2>
            </div>
        )
    }

    return (<form className="list-none m-auto p-4 w-11/12 max-w-xl shadow-md rounded-md bg-white"
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
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
        />
        <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(7)]}
            errorText="Please enter a valid description. (at least 7 characters)"
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>)
}

export default UpdatePlace;