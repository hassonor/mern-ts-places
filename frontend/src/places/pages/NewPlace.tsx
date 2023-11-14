import { FC, FormEvent, ReactElement, useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input.tsx";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import Button from "../../shared/components/FormElements/Button.tsx";
import { useForm } from "../../shared/hooks/form-hook.ts";


const NewPlace: FC = (): ReactElement => {

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
        }
    }, false);


    const placeSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <form className="list-none m-auto p-4 w-11/12 max-w-xl shadow-md rounded-md bg-white"
              onSubmit={placeSubmitHandler}>
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
            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
        </form>
    )
}

export default NewPlace;