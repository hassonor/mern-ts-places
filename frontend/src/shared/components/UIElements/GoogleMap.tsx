import { FC, useRef, useEffect, CSSProperties } from "react";

interface GoogleMapProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
    className?: string;
    style?: CSSProperties;
}

const GoogleMap: FC<GoogleMapProps> = ({center, zoom, className, style}) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
                center: center,
                zoom: zoom
            });

            new google.maps.Marker({position: center, map: map});
        }
    }, [center, zoom]);

    return (
        <div ref={mapRef} className={`w-full h-full ${className}`} style={style}/>
    );
}

export default GoogleMap;
