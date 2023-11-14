import { useCallback, useReducer } from "react";

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
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }
        default:
            return state;
    }
}
export const useForm = (initialInputs, initialValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialValidity
    })

    const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({type: 'INPUT_CHANGE', inputId: id, value, isValid});
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({type: 'SET_DATA', inputs: inputData, formIsValid: formValidity});
    }, [])

    return [formState, inputHandler, setFormData];

}