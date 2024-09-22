import React, { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';

function Sidebar() {
    const [status, setStatus] = useState(false);

    
    const isLoggedIn = true; 
    const userName = "Admin"; 

    return (
        <div>
            <div className='flex justify-between '>
                <div className='ml-10'>
                    
                </div>
                <div>
                    <ul className='hidden md:flex space-x-5 bg-gray-700 text-white h-8'>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/about'>About us</a></li>
                        <li><a href='/contact'>Contact us</a></li>
                        <li><a href='/profile'>Profile</a></li>
                        <li><a href='/add-items'>Add Items</a></li>
                    </ul>
                    <AiOutlineBars className='left-1 absolute top-12 cursor-pointer' size={'25px'} onClick={() => setStatus(true)} />
                </div>
            </div>

            {status ? (
                <div className='bg-black/70 absolute w-full h-screen flex top-0'>
                    <div className='z-10 bg-white w-[240px] h-screen p-4'>

                        <div className='flex justify-between items-center mb-4'>
                            <AiOutlineBars className='cursor-pointer' size={'25px'} onClick={() => setStatus(false)} />
                        </div>

                        <div className='mb-6'>
                            {isLoggedIn ? (
                                <div>
                                    <p className="font-bold text-lg">Welcome, {userName}</p>
                                    <hr className="my-2" />
                                </div>
                            ) : (
                                <a href="/login" className="font-bold text-lg">Login</a>
                            )}
                        </div>

                       

                        <div className='mt-8'>
                            <p className='font-bold text-lg mb-3'>Trending</p>
                            <ul className="space-y-2">
                                <li><a href='/best-sellers' className='block hover:text-blue-600'>Best Sellers</a></li>
                                <li><a href='/new-releases' className='block hover:text-blue-600'>New Releases</a></li>
                                <li><a href='/movers-shakers' className='block hover:text-blue-600'>Movers and Shakers</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Sidebar;
