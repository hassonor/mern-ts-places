import { FC, FormEvent, ReactElement, useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input.tsx";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import Button from "../../shared/components/FormElements/Button.tsx";


const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            // eslint-disable-next-line no-case-declarations
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        default:
            return state;
    }
}

const NewPlaces: FC = (): ReactElement => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    })

    const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({type: 'INPUT_CHANGE', inputId: id, value, isValid});
    }, []);

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

export default NewPlaces;