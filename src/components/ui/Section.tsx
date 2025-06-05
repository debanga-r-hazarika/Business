import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: 'white' | 'light' | 'dark' | 'primary' | 'gradient';
  spacing?: 'none' | 'small' | 'medium' | 'large';
}

const Section = ({
  children,
  className = '',
  id,
  bg = 'white',
  spacing = 'medium',
}: SectionProps) => {
  // Background classes
  const bgClasses = {
    white: 'bg-white',
    light: 'bg-dark-50',
    dark: 'bg-dark-900 text-white',
    primary: 'bg-primary-50',
    gradient: 'bg-gradient-to-br from-dark-900 via-primary-900 to-dark-900 text-white',
  };

  // Spacing classes
  const spacingClasses = {
    none: 'py-0',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-20',
    large: 'py-16 md:py-32',
  };

  return (
    <section
      id={id}
      className={`${bgClasses[bg]} ${spacingClasses[spacing]} ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
};

export default Section;