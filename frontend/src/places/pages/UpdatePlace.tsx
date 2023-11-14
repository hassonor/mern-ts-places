import { FC } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces.tsx";
import Input from "../../shared/components/FormElements/Input.tsx";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.ts";
import Button from "../../shared/components/FormElements/Button.tsx";

const UpdatePlace: FC = () => {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    if (!identifiedPlace) {
        return (
            <div className="text-center flex justify-center items-center">
                <h2> Could not find place.</h2>
            </div>
        )
    }

    return (<form>
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={() => {
            }}
            value={identifiedPlace.title}
            valid={true}
        />
        <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(7)]}
            errorText="Please enter a valid description. (at least 7 characters)"
            onInput={() => {
            }}
            value={identifiedPlace.description}
            valid={true}
        />
        <Button type="submit" disabled={true}>UPDATE PLACE</Button>
    </form>)
}

export default UpdatePlace;