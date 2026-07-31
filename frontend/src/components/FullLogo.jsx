import React from 'react';
import Logo from './Logo'; 

const FullLogo = ({ 
    text, 
    textColor = "text-slate-800", // Default text color if none is provided
    logoClassName = "w-12 h-12",  // Default logo size if none is provided
    containerClassName = "",      // For any extra wrapper classes (like margins)
    onClick                       // Allows you to pass click events (like navigation)
}) => {
    return (
        <div 
            onClick={onClick}
            className={`flex items-center gap-3 cursor-pointer select-none ${containerClassName}`}
        >
            {/* The SVG Icon */}
            <Logo className={logoClassName} />
            
            {/* The Brand Text */}
            {text && (
                <span className={`font-extrabold text-2xl tracking-tight ${textColor}`}>
                    {text}
                </span>
            )}
        </div>
    );
};

export default FullLogo;