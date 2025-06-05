import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  padding?: 'none' | 'small' | 'medium' | 'large';
  border?: boolean;
  hoverEffect?: boolean;
}

const Card = ({
  children,
  className = '',
  elevation = 'medium',
  padding = 'medium',
  border = false,
  hoverEffect = false,
}: CardProps) => {
  // Shadow classes
  const shadowClasses = {
    none: '',
    low: 'shadow-soft',
    medium: 'shadow-medium',
    high: 'shadow-hard',
  };

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-5',
    large: 'p-8',
  };

  // Border classes
  const borderClasses = border ? 'border border-dark-200' : '';

  // Hover effect
  const hoverClasses = hoverEffect
    ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-hard'
    : '';

  return (
    <div
      className={`bg-white rounded-lg ${shadowClasses[elevation]} ${paddingClasses[padding]} ${borderClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;