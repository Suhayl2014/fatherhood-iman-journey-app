import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function BrandLogo({ size = 'md', showText = true }: BrandLogoProps) {
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      icon: 'h-4 w-4',
      text: 'text-lg',
      subtitle: 'text-xs'
    },
    md: {
      container: 'w-10 h-10',
      icon: 'h-5 w-5',
      text: 'text-xl',
      subtitle: 'text-xs'
    },
    lg: {
      container: 'w-12 h-12',
      icon: 'h-6 w-6',
      text: 'text-2xl',
      subtitle: 'text-sm'
    }
  };

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className={`${sizes[size].container} rounded-full bg-gradient-to-br from-islamic-green to-islamic-teal flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow relative overflow-hidden`}>
        <div className="absolute inset-0 rounded-full bg-islamic-pattern opacity-10"></div>
        <div className="relative w-full h-full">
          <img 
            src="/images/ChatGPT Image Apr 13, 2025, 01_59_30 PM.png?v=2" 
            alt="The Modern Muslim Dad Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {showText && (
        <div>
          <h1 className={`${sizes[size].text} font-bold text-islamic-green group-hover:text-islamic-teal transition-colors`}>
            The Modern Muslim Dad
          </h1>
          <p className={`${sizes[size].subtitle} text-islamic-teal`}>Empowering fathers with faith</p>
        </div>
      )}
    </Link>
  );
} 