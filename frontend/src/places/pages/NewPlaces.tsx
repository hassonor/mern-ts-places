import { FC, ReactElement } from "react";
import Input from "../../shared/components/FormElements/Input.tsx";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";


const NewPlaces: FC = (): ReactElement => {
    return (
        <form className="list-none m-auto p-4 w-11/12 max-w-xl shadow-md rounded-md bg-white">
            <Input element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]}
                   errorText="Please enter a valid title."/>
        </form>
    )
}

export default NewPlaces;