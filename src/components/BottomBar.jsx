import React from 'react';

const BottomBar = () => {
	return (
		<footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center text-[12px] font-bold p-5">
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
