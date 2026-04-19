import React, { useState, useEffect } from 'react';
import { useAutoHide } from '../hooks/useAutoHide';

const Navbar = () => {
	const isVisible = useAutoHide('top');
	const [isPastHero, setIsPastHero] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > window.innerHeight * 0.5) {
				setIsPastHero(true);
			} else {
				setIsPastHero(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Check on mount
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center text-[12px] font-bold p-5 transform transition-colors transition-transform duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
			<div 
				onClick={() => {
					if (window.location.pathname === '/') {
						window.scrollTo({ top: 0, behavior: 'smooth' });
					} else {
						window.location.href = '/';
					}
				}}
				className={`cursor-pointer transition-colors duration-300 ${isPastHero ? 'text-slate' : 'text-bbblack'}`}
			>
				Alen Koikkara
			</div>
			<div className="flex items-center justify-between gap-12 w-[30%]">
				<div 
					onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
					className={`cursor-pointer hover:text-bbblack transition-colors duration-300 ${isPastHero ? 'text-bbblack' : 'text-slate'}`}
				>
					Work
				</div>
				<div className={`cursor-pointer hover:text-bbblack transition-colors duration-300 ${isPastHero ? 'text-bbblack' : 'text-slate'}`}>
					About
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
