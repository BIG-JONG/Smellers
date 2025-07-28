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
  const baseClasses = "inline-block rounded-sm border px-12 py-3 text-sm font-medium focus:ring-3 focus:outline-hidden";

  const variants = {
    filled: "border-black bg-white text-black hover:bg-black hover:text-white",
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
      {children}확인
    </button>
  );
}

export default Button;