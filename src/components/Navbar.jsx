import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAutoHide } from '../hooks/useAutoHide';

const Navbar = () => {
	const isVisible = useAutoHide('top');
	const [isPastHero, setIsPastHero] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	// On non-home pages, always show the navbar as "past hero" style
	const isHome = location.pathname === '/';

	useEffect(() => {
		if (!isHome) {
			setIsPastHero(false);
			return;
		}

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
	}, [isHome]);

	return (
		<nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center text-[12px] font-bold p-5 transform transition-colors transition-transform duration-500 ease-in-out ${isVisible || !isHome ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
			<div 
				onClick={() => {
					if (isHome) {
						window.scrollTo({ top: 0, behavior: 'smooth' });
					} else {
						navigate('/');
					}
				}}
				className={`cursor-pointer transition-colors duration-300 ${isPastHero ? 'text-slate' : 'text-bbblack'}`}
			>
				Alen Koikkara
			</div>
			<div className="flex items-center justify-between gap-12 w-[30%]">
				<div 
					onClick={() => {
						if (isHome) {
							window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
						} else {
							navigate('/');
						}
					}}
					className={`cursor-pointer hover:text-bbblack transition-colors duration-300 ${isPastHero ? 'text-bbblack' : 'text-slate'}`}
				>
					Work
				</div>
				<div 
					onClick={() => navigate('/about')}
					className={`cursor-pointer hover:text-bbblack transition-colors duration-300 ${isPastHero ? 'text-bbblack' : 'text-slate'}`}
				>
					About
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

