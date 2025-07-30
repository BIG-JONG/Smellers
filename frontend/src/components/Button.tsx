// src/components/Button.tsx
import React from 'react';

type ButtonProps = {
  variant?: "filled" | "outline";
  children?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

function Button({
  variant = "filled",
  children, // 버튼 내용
  href,
  onClick,
  type = "button",
  disabled,
  className: additionalClasses,
}: ButtonProps) {
  // 여기서 'border' 클래스를 제거하고, 'focus:ring' 스타일만 남깁니다.
  // 이미지에 보이는 버튼처럼 테두리가 없어야 합니다.
  const baseClasses = "inline-block rounded-sm px-12 py-3 text-sm font-medium focus:outline-none focus:ring-3 focus:ring-opacity-50 transition-colors duration-200";

  const variants = {
    // 'border-black' 같은 테두리 관련 클래스를 제거합니다.
    filled: "bg-white text-black hover:bg-black hover:text-white", // 이미지 버튼과 유사한 스타일
    outline: "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
  };

  const classes = `${baseClasses} ${variants[variant]} ${additionalClasses || ''}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={classes}
      disabled={disabled}
    >
      {children} {/* <<< 여기가 핵심! 이전에 붙어있던 "확인" 텍스트를 제거했습니다. */}
    </button>
  );
}

export default Button;