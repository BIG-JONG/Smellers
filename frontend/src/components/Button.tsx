import React from 'react';
import { PerfumeDetailData } from './PerfumeDetailSection';

type ButtonProps = {
    variant?: "filled" | "outline";
    children?: React.ReactNode;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;

    actionType?: 'edit' | 'delete';
    perfume?: PerfumeDetailData; 
    onEdit?: (perfume: PerfumeDetailData) => void; 
    onDelete?: (perfumeId: string) => void; 
};

function Button({
    variant = "filled",
    children, 
    href,
    onClick,
    type = "button",
    disabled,
    className: additionalClasses,
    actionType,
    perfume,
    onEdit,
    onDelete
}: ButtonProps) {
    const baseClasses = "inline-block rounded-sm px-12 py-3 text-sm font-medium focus:outline-none focus:ring-3 focus:ring-opacity-50 transition-colors duration-200";

    const variants = {
        filled: "bg-white text-black hover:bg-black hover:text-white border border-black",
        outline: "bg-black text-white border border-black hover:bg-white hover:text-black"
    };

    const classes = `${baseClasses} ${variants[variant]} ${additionalClasses || ''}`;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
            return;
        }

        if (actionType === 'edit' && onEdit && perfume) {
            onEdit(perfume);
        } else if (actionType === 'delete' && onDelete && perfume) {
            if (window.confirm(`${perfume.name} 향수를 정말 삭제하시겠습니까?`)) {
                onDelete(perfume.id.toString());
            }
        }
    };

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button
            onClick={handleClick}
            type={type}
            className={classes}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;