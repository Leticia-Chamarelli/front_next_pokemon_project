import React from 'react';
import { Card, CardContent } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button"; 

interface DashboardCardProps {
  icon: React.ReactNode; 
  title: string; // <--- ADICIONE ESTA LINHA!
  description: string;
  buttonText: string;
  buttonColorClasses: string; 
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title, // Agora 'title' está presente e tipado
  description,
  buttonText,
  buttonColorClasses,
  onClick,
}) => {
  return (
    <Card className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <CardContent className="flex flex-col items-center p-0 pt-6">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4"
          style={{ 
            backgroundColor: buttonColorClasses.includes('red') ? '#DC2626' : (buttonColorClasses.includes('blue') ? '#2563EB' : 'gray') 
          }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-6 max-w-xs">{description}</p>
        <Button
          onClick={onClick}
          className={`w-full py-3 px-6 rounded-lg text-lg font-bold ${buttonColorClasses} text-white transition-all duration-300`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;