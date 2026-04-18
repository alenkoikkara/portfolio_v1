import React from 'react';
import { useAutoHide } from '../hooks/useAutoHide';

const Navbar = () => {
	const isVisible = useAutoHide('top');

	return (
		<nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center text-[12px] font-bold p-5 transform transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
			<div className='cursor-pointer text-bbblack'>
				Alen Koikkara
			</div>
			<div className="flex items-center justify-between gap-12 w-[30%]">
				<div className='cursor-pointer text-slate hover:text-bbblack transition-colors duration-300'>
					Work
				</div>
				<div className='cursor-pointer text-slate hover:text-bbblack transition-colors duration-300'>
					About
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
