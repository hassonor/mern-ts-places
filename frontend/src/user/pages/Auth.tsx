import { FC, useState } from "react";
import Card from "../../shared/components/UIElements/Card.tsx";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import Input from "../../shared/components/FormElements/Input.tsx";
import { useForm } from "../../shared/hooks/form-hook.ts";
import Button from "../../shared/components/FormElements/Button.tsx";

const Auth: FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({...formState.inputs, name: undefined}, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode);

    }

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <Card className="w-full max-w-lg mx-auto mt-24 p-8 bg-white rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{isLoginMode ? 'Login' : 'Sign Up'} Required</h2>
            <hr className="mb-6 border-gray-300"/>
            <form className="space-y-8" onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                )}
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(7)]}
                    errorText="Please enter a valid password (min. 7 characters)."
                    onInput={inputHandler}
                />
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        disabled={!formState.isValid}
                    >
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>

                </div>
                <div className="flex justify-center">
                    <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
                </div>
            </form>

        </Card>
    )
}

export default Auth;
