import React from 'react';

const Card = ({className, style, children}) => {
    return (
        <div className={`relative m-0 shadow-lg rounded-lg overflow-hidden bg-white ${className}`} style={style}>
            {children}
        </div>
    );
};

export default Card;