import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string | ReactNode;
  centered?: boolean;
  color?: 'dark' | 'light';
  withLine?: boolean;
  className?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  centered = false,
  color = 'dark',
  withLine = true,
  className = '',
}: SectionTitleProps) => {
  // Text color classes
  const textColorClasses = {
    dark: 'text-dark-800',
    light: 'text-white',
  };

  // Subtitle color classes
  const subtitleColorClasses = {
    dark: 'text-dark-500',
    light: 'text-dark-200',
  };

  // Line color classes
  const lineColorClasses = {
    dark: 'bg-primary-500',
    light: 'bg-primary-400',
  };

  // Alignment classes
  const alignClasses = centered ? 'text-center mx-auto' : '';

  return (
    <div className={`max-w-3xl mb-12 ${alignClasses} ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-display font-bold leading-tight ${textColorClasses[color]}`}>
        {title}
      </h2>
      
      {withLine && (
        <div className={`h-1 w-16 ${lineColorClasses[color]} mt-4 mb-4 ${centered ? 'mx-auto' : ''}`}></div>
      )}
      
      {subtitle && (
        <div className={`mt-4 text-lg ${subtitleColorClasses[color]}`}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default SectionTitle;