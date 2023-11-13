import { FC, useRef, useEffect } from "react";


const GoogleMap: FC = props => {
    const mapRef = useRef();

    const {center, zoom} = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        });

        new window.google.maps.Marker({position: center, map: map});

    }, [center, zoom]);


    return (
        <div ref={mapRef} className={`w-full h-full ${props.className}`} style={props.style}>

        </div>
    );
}

export default GoogleMap;