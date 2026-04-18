import React from 'react';
import { useAutoHide } from '../hooks/useAutoHide';

const BottomBar = () => {
	const isVisible = useAutoHide('bottom');

	return (
		<footer className={`fixed bottom-0 left-0 w-full z-50 flex justify-between items-center text-[12px] font-bold p-5 transform transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
			<div className='cursor-pointer text-slate'>
				Copyright © 2026 Alen Koikkara
			</div>
			<div className="flex items-center justify-between gap-12 w-[30%]">
				<div className='flex gap-4 cursor-pointer text-slate transition-colors duration-300'>
					<div className='hover:text-bbblack'>Li</div>
					<div className='hover:text-bbblack'>Gh</div>
					<div className='hover:text-bbblack'>Md</div>
				</div>
				<div className='cursor-pointer text-slate hover:text-bbblack transition-colors duration-300'>
					Contact
				</div>
			</div>
		</footer>
	);
};

export default BottomBar;
