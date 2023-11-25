import { FC, useEffect } from "react";
import { useForm } from "../../shared/hooks/form-hook.ts";
import { TPlace } from "../../types/types.ts";
import Input from "../../shared/components/FormElements/Input.tsx";
import Button from "../../shared/components/FormElements/Button.tsx";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import { Form, useNavigation } from "react-router-dom";


type UpdatePlaceFormProps = {
    place: TPlace
};

const UpdatePlaceForm: FC<UpdatePlaceFormProps> = ({place}) => {
    const navigation = useNavigation();
    const [formState, inputHandler, setFormData] = useForm({
        title: {value: '', isValid: false},
        description: {value: '', isValid: false}
    }, false);

    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (place) {
            setFormData({
                title: {value: place.title, isValid: true},
                description: {value: place.description, isValid: true}
            }, true);
        }
    }, [place, setFormData]);


    return (
        <Form
            method="patch"
            className="list-none m-auto p-4 w-11/12 max-w-xl shadow-md rounded-md bg-white"
        >
            <Input
                id="title"
                element="input"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={place.title}
                initialValid={true}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(7)]}
                errorText="Please enter a valid description. (at least 7 characters)"
                onInput={inputHandler}
                initialValue={place.description}
                initialValid={true}
            />
            <Button type="submit"
                    disabled={!formState.isValid || isSubmitting}>{isSubmitting ? 'UPDATING...' : 'UPDATE'}</Button>
            <Button to='..' relative='path' inverse disabled={isSubmitting}>BACK</Button>
        </Form>
    );
}

export default UpdatePlaceForm;
