import React, { ReactNode, CSSProperties } from 'react';

type CardProps = {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
};

const Card: React.FC<CardProps> = ({className = '', style, children}) => {
    return (
        <div className={`relative m-0 shadow-lg rounded-lg overflow-hidden bg-white ${className}`} style={style}>
            {children}
        </div>
    );
};

export default Card;
