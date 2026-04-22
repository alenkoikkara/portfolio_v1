import React from 'react';

const SidebarNavigation = ({ 
  links, 
  activeIndex = -1, 
  className = "", 
  onLinkClick 
}) => {
  return (
    <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-8 text-[12px] font-bold mix-blend-difference text-white ${className}`}>
      {links.map((link, i) => {
        const label = typeof link === 'string' ? link : link.label;
        const isActive = i === activeIndex;
        
        return (
          <div
            key={i}
            onClick={() => {
              if (typeof link === 'object' && link.onClick) link.onClick();
              if (onLinkClick) onLinkClick(i);
            }}
            className={`group flex items-center justify-end cursor-pointer transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
          >
            <span className="flex">
              <span>{label[0]}</span>
              <span className={`overflow-hidden transition-all duration-1000 ease-in-out whitespace-nowrap ${isActive ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100'}`}>
                {label.slice(1)}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarNavigation;
