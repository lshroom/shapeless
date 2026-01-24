import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold rounded-xl transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75';
  let variantStyles = '';
  let sizeStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-[#9d81ff] text-white hover:bg-[#b69eff] shadow-lg shadow-[#9d81ff]/50 hover:shadow-[#9d81ff]/70';
      break;
    case 'secondary':
      variantStyles = 'bg-[#8165d4] text-white hover:bg-[#9d81ff] shadow-lg shadow-[#8165d4]/50 hover:shadow-[#8165d4]/70';
      break;
    case 'outline':
      variantStyles = 'border-2 border-[#9d81ff] text-[#9d81ff] hover:bg-[#9d81ff] hover:text-white shadow-md shadow-[#9d81ff]/30 hover:shadow-[#9d81ff]/50';
      break;
  }

  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;