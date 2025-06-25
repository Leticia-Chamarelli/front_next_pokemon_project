import React from 'react';

interface PokeballIconProps {
  size?: 'small' | 'medium' | 'large'; // Tamanhos predefinidos para flexibilidade
  className?: string; // Para classes adicionais de Tailwind
}

const PokeballIcon: React.FC<PokeballIconProps> = ({ size = 'medium', className = '' }) => {
  let mainSizeClasses = '';
  let buttonSizeClasses = '';
  let innerCircleSizeClasses = '';
  let centerLineHeight = '';

  switch (size) {
    case 'small':
      mainSizeClasses = 'w-12 h-12'; // Ajustado para ser bem pequeno
      buttonSizeClasses = 'w-5 h-5 border-2';
      innerCircleSizeClasses = 'w-2 h-2';
      centerLineHeight = 'h-1';
      break;
    case 'medium': // Tamanho padrão (como a da imagem no topo)
      mainSizeClasses = 'w-20 h-20';
      buttonSizeClasses = 'w-8 h-8 border-2';
      innerCircleSizeClasses = 'w-3 h-3';
      centerLineHeight = 'h-2';
      break;
    case 'large': // Para a central grande, se você decidir usá-la aqui, mas o HeroSection já tem uma
      mainSizeClasses = 'w-40 h-40';
      buttonSizeClasses = 'w-16 h-16 border-4';
      innerCircleSizeClasses = 'w-6 h-6';
      centerLineHeight = 'h-3';
      break;
    default:
      mainSizeClasses = 'w-20 h-20';
      buttonSizeClasses = 'w-8 h-8 border-2';
      innerCircleSizeClasses = 'w-3 h-3';
      centerLineHeight = 'h-2';
  }

  return (
    <div className={`relative rounded-full overflow-hidden ${mainSizeClasses} ${className}`}>
      <div className={`w-full h-full rounded-full bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center shadow-md relative`}>
        {/* Parte superior vermelha */}
        <div className="absolute top-0 overflow-hidden rounded-t-full w-full h-1/2 bg-gradient-to-b from-red-600 to-red-800"></div>
        
        {/* Linha preta central */}
        <div className={`w-full ${centerLineHeight} bg-gray-900 absolute top-1/2 transform -translate-y-1/2 z-10`}></div>
        
        {/* Parte inferior branca/cinza clara */}
        <div className="absolute bottom-0 overflow-hidden rounded-b-full w-full h-1/2 bg-gradient-to-t from-gray-100 to-gray-300"></div>

        {/* Botão central */}
        <div className={`rounded-full bg-white border-gray-900 flex items-center justify-center absolute z-20 shadow-sm ${buttonSizeClasses}`}>
          {/* Círculo interno preto do botão */}
          <div className={`rounded-full bg-gray-900 ${innerCircleSizeClasses}`}></div>
        </div>
      </div>
    </div>
  );
};

export default PokeballIcon;