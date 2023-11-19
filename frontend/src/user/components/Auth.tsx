import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../../shared/components/UIElements/Card.tsx";
import {
    VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH,
    VALIDATOR_MINLENGTH,
    VALIDATOR_NO_SPACE
} from "../../shared/utils/validators.ts";
import Input from "../../shared/components/FormElements/Input.tsx";
import { useForm } from "../../shared/hooks/form-hook.ts";
import Button from "../../shared/components/FormElements/Button.tsx";
import { AuthContext } from "../../shared/context/auth-context.ts";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.tsx";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.tsx";
import useHttpClient from "../../shared/hooks/http-hook.ts";
import { TUserResponse } from "../../types/types.ts";

const Auth: FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext)

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
            setFormData({
                ...formState.inputs,
                username: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                username: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const authSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const userData = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            ...(isLoginMode ? {} : {username: formState.inputs.username.value})
        };

        const endpoint = isLoginMode ? 'signin' : 'signup';
        sendRequest(`http://localhost:5000/api/v1/${endpoint}`, 'POST', userData)
            .then((response) => {
                const userResponse = response as TUserResponse;
                authCtx.login(userResponse.user._id, userResponse.token);
                navigate('/');
            })
            .catch(() => {
                // Since error handling is managed by useHttpClient, this catch block might not be necessary.
                // However, if you want to perform any additional actions on error, you can do it here.
            });
    }

    return (
        <Card className="w-full max-w-lg mx-auto mt-24 p-8 bg-white rounded-xl shadow-xl">
            {isLoading && <LoadingSpinner asOverlay/>}
            {error && <ErrorModal error={error} onClear={clearError}/>}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{isLoginMode ? 'Login' : 'Sign Up'} Required</h2>
            <hr className="mb-6 border-gray-300"/>
            <form className="space-y-8" onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="username"
                        type="text"
                        label="Username"
                        validators={[VALIDATOR_NO_SPACE(), VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(15)]}
                        errorText="Please enter a valid username (no spaces and between 4-15 characters)."
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
                    validators={[VALIDATOR_MINLENGTH(7), VALIDATOR_MAXLENGTH(15)]}
                    errorText="Please enter a valid password (between 7-15 characters)."
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
                    <Button inverse onClick={switchModeHandler}>SWITCH
                        TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
                </div>
            </form>
        </Card>
    )
}

export default Auth;
