import React, { useState } from 'react';
import { useAutoHide } from '../hooks/useAutoHide';
import ContactModal from './ContactModal';

const BottomBar = () => {
	const isVisible = useAutoHide('bottom');
	const [isContactOpen, setIsContactOpen] = useState(false);

	return (
		<>
			<footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center text-[12px] font-bold p-5 mix-blend-difference text-white">
				<div className='cursor-pointer font-medium opacity-50'>
					Copyright © 2026 Alen Koikkara
				</div>
				<div className={`flex items-center justify-between gap-12 w-[30%] transform transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
					<div className='flex gap-4 cursor-pointer transition-opacity duration-300'>
						<a href='https://www.linkedin.com/in/alenkoikkara/' target='_blank' rel='noopener noreferrer' className='opacity-70 hover:opacity-100'>Li</a>
						<a href='https://github.com/alenkoikkara' target='_blank' rel='noopener noreferrer' className='opacity-70 hover:opacity-100'>Gh</a>
						<a href='https://medium.com/@alendennis77' target='_blank' rel='noopener noreferrer' className='opacity-70 hover:opacity-100'>Md</a>
					</div>
					<div 
						onClick={() => setIsContactOpen(!isContactOpen)}
						className='cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300'
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

