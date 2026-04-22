import React, { useState } from 'react';
import { useAutoHide } from '../hooks/useAutoHide';
import ContactModal from './ContactModal';

const BottomBar = () => {
	const isVisible = useAutoHide('bottom');
	const [isContactOpen, setIsContactOpen] = useState(false);

	return (
		<>
			<footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center text-[12px] font-bold p-5 mix-blend-difference text-white">
				<div className='cursor-pointer font-medium'>
					Copyright © 2026 Alen Koikkara
				</div>
				<div className={`flex items-center justify-between gap-12 w-[30%] transform transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
					<div className='flex gap-4 cursor-pointer transition-opacity duration-300'>
						<div className='hover:opacity-70'>Li</div>
						<div className='hover:opacity-70'>Gh</div>
						<div className='hover:opacity-70'>Md</div>
					</div>
					<div 
						onClick={() => setIsContactOpen(!isContactOpen)}
						className='cursor-pointer hover:opacity-70 transition-opacity duration-300'
					>
						Contact
					</div>
				</div>
			</footer>
			<ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
		</>
	);
};

export default BottomBar;

