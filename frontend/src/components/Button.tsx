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

    // 수정 및 삭제 로직을 위한 prop들
    actionType?: 'edit' | 'delete';
    perfume?: PerfumeDetailData; // 수정/삭제할 향수 데이터
    onEdit?: (perfume: PerfumeDetailData) => void; // 수정 버튼 클릭 시 실행할 함수
    onDelete?: (perfumeId: string) => void; // 삭제 버튼 클릭 시 실행할 함수
};

function Button({
    variant = "filled",
    children, // 버튼 내용
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
        // onClick prop이 있으면 먼저 실행
        if (onClick) {
            onClick(e);
            return;
        }

        if (actionType === 'edit' && onEdit && perfume) {
            onEdit(perfume);
        } else if (actionType === 'delete' && onDelete && perfume) {
            if (window.confirm(`${perfume.name} 향수를 정말 삭제하시겠습니까?`)) {
                onDelete(perfume.id);
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