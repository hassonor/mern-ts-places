import React from 'react';

const Avatar = ({image, alt, width, height, className}) => {
    const imgSize = `w-${width} h-${height}`;

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <img
                src={image}
                alt={alt}
                className={`block rounded-full ${imgSize} object-cover`}
            />
        </div>
    );
};

export default Avatar;
