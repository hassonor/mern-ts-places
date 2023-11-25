import { Form, useNavigation } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input.tsx";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import Button from "../../shared/components/FormElements/Button.tsx";
import { useForm } from "../../shared/hooks/form-hook.ts";
import ImageUpload from "../../shared/components/FormElements/ImageUpload.tsx";

const NewPlaceForm = () => {
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    const [formState, inputHandler] = useForm({
        title: {
            value: "",
            isValid: false,
        },
        description: {
            value: "",
            isValid: false,
        },
        address: {
            value: "",
            isValid: false,
        },
        image: {
            value: null,
            isValid: false,
        },
    }, false);

    return (
        <Form
            method="post"
            className="list-none m-auto p-4 w-11/12 max-w-xl shadow-md rounded-md bg-white"
        >
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(7)]}
                errorText="Please enter a valid description. (at least 7 characters)"
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                type="text"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address."
                onInput={inputHandler}
            />
            <ImageUpload id="image" onInput={inputHandler}/>
            <Button type="submit" disabled={!formState.isValid || isSubmitting}>
                {isSubmitting ? "CREATING PLACE..." : "ADD PLACE"}
            </Button>
            <Button to=".." relative="path" disabled={isSubmitting} inverse>
                CANCEL
            </Button>
        </Form>
    );
};

export default NewPlaceForm;
