import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    href?: string;
    to?: string;
    exact?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    inverse?: boolean;
    danger?: boolean;
    size?: 'small' | 'big' | 'default';
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const baseClasses = "px-6 py-2 border rounded cursor-pointer no-underline inline-block focus:outline-none disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed mr-4";

    // Determine color classes based on props
    let buttonColorClasses = `bg-[#ff0055] text-white border-[#ff0055] hover:bg-[#ff4382] active:bg-[#ff4382] hover:border-[#ff4382] active:border-[#ff4382]`;

    if (props.inverse) {
        buttonColorClasses = `bg-transparent text-[#ff0055] border-[#ff0055] hover:text-white active:text-white hover:bg-[#ff0055] active:bg-[#ff0055]`;
    } else if (props.danger) {
        buttonColorClasses = `bg-[#830000] text-white border-[#830000] hover:bg-[#f34343] active:bg-[#f34343] hover:border-[#f34343] active:border-[#f34343]`;
    }

    const sizeClasses = props.size === 'small' ? 'text-sm' : props.size === 'big' ? 'text-xl' : 'text-base';

    if (props.href) {
        return (
            <a
                className={`${baseClasses} ${buttonColorClasses} ${sizeClasses}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }

    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`${baseClasses} ${buttonColorClasses} ${sizeClasses}`}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <button
            className={`${baseClasses} ${buttonColorClasses} ${sizeClasses}`}
            type={props.type || 'button'}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
