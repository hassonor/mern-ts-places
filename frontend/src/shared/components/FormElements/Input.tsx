import { ChangeEvent, FC, useReducer, useEffect } from "react";
import { validate, Validator } from "../../utils/validators";

type InputProps = {
    element?: 'input' | 'textarea';
    id?: string;
    type?: string;
    placeholder?: string;
    rows?: number;
    label?: string;
    errorText?: string;
    onInput: (id: string, value: string, isValid: boolean) => void;
    validators?: Validator[];
    initialValue?: string;
    initialValid?: boolean;
};

type InputState = {
    value: string;
    isTouched: boolean;
    isValid: boolean;
};

type InputAction =
    | { type: 'CHANGE'; val: string; validators: Validator[] }
    | { type: 'TOUCH' };

const inputReducer = (state: InputState, action: InputAction): InputState => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};

const Input: FC<InputProps> = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(() => {
        onInput(id as string, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators || []});
    };

    const touchHandler = () => {
        dispatch({type: 'TOUCH'});
    };

    const element =
        props.element === 'input' ? (
            <input
                id={props.id}
                className={`block w-full bg-gray-100 border border-gray-300 p-1 ${!inputState.isValid && inputState.isTouched && 'border-red-500 bg-red-200'}`}
                type={props.type || 'text'}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                className={`block w-full bg-gray-100 border border-gray-300 p-1 ${!inputState.isValid && inputState.isTouched && 'border-red-500 bg-red-200'}`}
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        );


    return (
        <div className={`my-4 ${!inputState.isValid && inputState.isTouched && 'text-red-500'}`}>
            <label htmlFor={props.id} className="block font-bold mb-2">
                {props.label}
            </label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p className="text-red-500">{props.errorText}</p>}
        </div>
    );
};

export default Input;
